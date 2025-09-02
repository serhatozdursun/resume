// dangerfile.ts
import { message, warn, fail, markdown, danger } from 'danger';
import lcovParse, { LcovFile } from 'lcov-parse';
import fs from 'fs';
import OpenAI from 'openai';

/* =======================
   Config (env-driven)
   ======================= */
const MIN_FILE_COVERAGE: number = parseInt(
  process.env.MIN_FILE_COVERAGE || '80',
  10
);
const MAX_FILES_TO_ANALYZE: number = parseInt(
  process.env.MAX_FILES_TO_ANALYZE || '3',
  10
);
const OPENAI_MODEL: string = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const DANGER_ALWAYS_NEW_COMMENT: boolean =
  process.env.DANGER_ALWAYS_NEW_COMMENT === '1';

const AI_REVIEW_ENABLED: boolean =
  (process.env.AI_REVIEW_ENABLED ?? '1') === '1';
const AI_REVIEW_INLINE: boolean = (process.env.AI_REVIEW_INLINE ?? '1') === '1';
const AI_REVIEW_MAX_CHARS: number = parseInt(
  process.env.AI_REVIEW_MAX_CHARS || '100000',
  10
);
const AI_REVIEW_MAX_FINDINGS: number = parseInt(
  process.env.AI_REVIEW_MAX_FINDINGS || '8',
  10
);
const AI_REVIEW_BLOCK_ON_FINDINGS: boolean =
  process.env.AI_REVIEW_BLOCK_ON_FINDINGS === '1';

const HUNK_RE = /@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/;

/* =======================
   Constants
   ======================= */
const LCOV_PATH = 'coverage/lcov.info';
const MAX_DIFF_CHARS = 15_000;

/* =======================
   LCOV Types (no any)
   ======================= */
interface LcovLineDetail {
  line: number;
  hit: number;
}
interface LcovLines {
  found: number;
  hit: number;
  details: LcovLineDetail[];
}
interface LcovFileNorm {
  file: string;
  lines: LcovLines;
}

/* =======================
   Local Types
   ======================= */
interface FileCoverage {
  file: string;
  linesFound: number;
  linesHit: number;
  filePct: number;
  newExecLines: number;
  newCoveredLines: number;
  newPct: number | null;
}

type AISeverity = 'info' | 'warn' | 'fail';

interface AddedLine {
  index: number; // 0..N-1 across *added* lines only
  line: number; // absolute new-file line number
  text: string; // code on that added line (without '+')
}

interface ReviewDiff {
  file: string;
  diff: string;
  added: AddedLine[]; // enumerated added lines (for exact mapping)
}

interface AIReviewFindingIdx {
  file: string; // path like "src/pages/index.tsx"
  index: number; // index into the ADDED lines list (0-based)
  severity: AISeverity; // "info" | "warn" | "fail"
  title: string;
  body: string;
}

/* =======================
   Helpers
   ======================= */

// Normalize LCOV to a strict shape with details present
function normalizeLCOV(data: LcovFile[]): LcovFileNorm[] {
  return data.map(rec => {
    const r = rec as unknown as {
      file?: string;
      lines?: {
        found?: number;
        hit?: number;
        details?: Array<{ line: number; hit: number }>;
      };
    };
    const details = (r.lines?.details ?? []).map(d => ({
      line: typeof d.line === 'number' ? d.line : 0,
      hit: typeof d.hit === 'number' ? d.hit : 0,
    }));
    return {
      file: r.file ?? '',
      lines: { found: r.lines?.found ?? 0, hit: r.lines?.hit ?? 0, details },
    };
  });
}

function parseLCOV(path: string): Promise<LcovFileNorm[]> {
  return new Promise<LcovFileNorm[]>((resolve, reject) => {
    if (!fs.existsSync(path)) return resolve([]);
    lcovParse(path, (err: Error | null, data: LcovFile[]) => {
      if (err) return reject(err);
      resolve(normalizeLCOV(data || []));
    });
  });
}

// unified-diff -> set of line numbers (in NEW file) that were added/modified
function extractChangedLineNumbers(diffText: string): Set<number> {
  const out = new Set<number>();
  let newLine = 0;
  for (const raw of diffText.split('\n')) {
    const line = raw.replace(/\r$/, '');
    const h = HUNK_RE.exec(line); // <-- no ^ anchor anymore
    if (h) {
      newLine = parseInt(h[1], 10);
      continue;
    }
    if (line.startsWith('+++') || line.startsWith('---')) continue;

    const first = line[0];
    if (first === '+') {
      // added line in new file
      if (line.startsWith('+++')) continue; // skip header
      out.add(newLine);
      newLine++;
      continue;
    }
    if (first === '-') {
      // deletion in old file
      continue; // don't advance newLine
    }
    // context (or blank) line
    newLine++;
  }
  return out;
}

// Enumerate only ADDED lines with their new-file numbers & text
function enumerateAddedLines(diffText: string): AddedLine[] {
  const out: AddedLine[] = [];
  let newLine = 0;
  let idx = 0;

  for (const raw of diffText.split('\n')) {
    const line = raw.replace(/\r$/, '');
    const h = HUNK_RE.exec(line); // <-- no ^ anchor anymore
    if (h) {
      newLine = parseInt(h[1], 10);
      continue;
    }
    if (line.startsWith('+++') || line.startsWith('---')) continue;

    const first = line[0];
    if (first === '+') {
      if (line.startsWith('+++')) continue; // skip header
      out.push({ index: idx++, line: newLine, text: line.slice(1) });
      newLine++;
      continue;
    }
    if (first === '-') continue; // old file deletion
    newLine++; // context/blank
  }
  return out;
}

// Fresh comment per push (if enabled) or sticky comment update by default
async function post(md: string): Promise<void> {
  if (DANGER_ALWAYS_NEW_COMMENT) {
    const owner = danger.github.pr.base.repo.owner.login;
    const repo = danger.github.pr.base.repo.name;
    const number = danger.github.pr.number;
    await danger.github.api.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: md,
    });
  } else {
    markdown(md);
  }
}

/* ---------- AI: Test ideas ---------- */

async function aiTestIdeas(file: string, diffText: string): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return '_AI suggestions skipped: missing OPENAI_API_KEY._';
  const client = new OpenAI({ apiKey: key });
  const trimmed = diffText.slice(0, MAX_DIFF_CHARS);

  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    {
      role: 'system',
      content:
        'You are a senior Software Developer engineer and expert on React and Typescript. ' +
        'Output only one Markdown code block with a runnable Jest test file in TypeScript.',
    },
    {
      role: 'user',
      content: `Write a copy-paste-ready test file for the diff below.
- File name: \`src/tests/${file
        .split('/')
        .pop()
        ?.replace(/\.[jt]sx?$/, '')}.auto.test.ts\`
- Use realistic imports relative to project root.
- Cover branches/edge cases implied by the diff.
- Keep it minimal but runnable.

Diff:
${trimmed || 'N/A'}`,
    },
  ];

  try {
    const res = await client.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.2,
      messages,
    });
    return res.choices[0]?.message?.content ?? '_No AI output._';
  } catch {
    return '_AI suggestions skipped due to API error._';
  }
}

/* ---------- AI: Structured code review (index → exact line) ---------- */

async function aiCodeReview(
  diffs: ReviewDiff[]
): Promise<AIReviewFindingIdx[]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return [];
  const client = new OpenAI({ apiKey: key });

  // Build prompt: one section per file listing added lines as index:newLine:code
  const joined = diffs
    .map(d => {
      const listing = d.added
        .map(a => `${a.index}:${a.line}:${a.text.slice(0, 140)}`)
        .join('\n');
      return `# FILE: ${d.file}\nADDED_LINES (index:newLine:code):\n${listing || '(none)'}`;
    })
    .join('\n\n');
  const trimmed = joined.slice(0, AI_REVIEW_MAX_CHARS);

  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    {
      role: 'system',
      content:
        'You are a senior Software Developer engineer (React + TypeScript expert). ' +
        'Return ONLY a single JSON array. No prose, no backticks. ' +
        'Each element MUST be: ' +
        '{ "file": string, "index": number, "severity": "info"|"warn"|"fail", "title": string, "body": string }. ' +
        'The "index" MUST be one of the integers shown for that file in ADDED_LINES. ' +
        `Pick at most ${AI_REVIEW_MAX_FINDINGS} high-signal findings.`,
    },
    { role: 'user', content: trimmed || 'N/A' },
  ];

  try {
    const res = await client.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.1,
      messages,
    });
    const raw = res.choices[0]?.message?.content ?? '[]';
    const jsonText = (() => {
      const m = /```(?:json)?\s*([\s\S]*?)```/m.exec(raw);
      return m && m[1] ? m[1] : raw;
    })();
    const parsed: unknown = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) return [];
    // type guard
    const findings: AIReviewFindingIdx[] = parsed
      .filter((x: unknown): x is AIReviewFindingIdx => {
        if (typeof x !== 'object' || x === null) return false;
        const o = x as Record<string, unknown>;
        const fileOk =
          typeof o.file === 'string' && (o.file as string).length > 0;
        const idxOk =
          typeof o.index === 'number' &&
          Number.isInteger(o.index) &&
          (o.index as number) >= 0;
        const sev = o.severity;
        const sevOk = sev === 'info' || sev === 'warn' || sev === 'fail';
        const titleOk =
          typeof o.title === 'string' && (o.title as string).length > 0;
        const bodyOk =
          typeof o.body === 'string' && (o.body as string).length > 0;
        return fileOk && idxOk && sevOk && titleOk && bodyOk;
      })
      .slice(0, AI_REVIEW_MAX_FINDINGS);
    return findings;
  } catch {
    return [];
  }
}

/* =======================
   Main
   ======================= */
export default async function run(): Promise<void> {
  // Which source files changed? (ignore tests and .d.ts)
  const changed = Array.from(
    new Set([...danger.git.modified_files, ...danger.git.created_files])
  ).filter(
    f =>
      f.startsWith('src/') &&
      !/(\.spec|\.test)\.[jt]sx?$/.test(f) &&
      !/\.d\.ts$/.test(f)
  );

  // Debug
  console.log('DEBUG', {
    MIN_FILE_COVERAGE,
    MAX_FILES_TO_ANALYZE,
    OPENAI_MODEL,
    LCOV_PATH,
    DANGER_ALWAYS_NEW_COMMENT,
    AI_REVIEW_ENABLED,
    AI_REVIEW_INLINE,
    AI_REVIEW_MAX_CHARS,
    AI_REVIEW_MAX_FINDINGS,
    AI_REVIEW_BLOCK_ON_FINDINGS,
    changed,
  });
  await post(
    [
      '### Debug',
      '',
      `- \`MIN_FILE_COVERAGE\`: **${MIN_FILE_COVERAGE}%**`,
      `- \`MAX_FILES_TO_ANALYZE\`: **${MAX_FILES_TO_ANALYZE}**`,
      `- \`OPENAI_MODEL\`: \`${OPENAI_MODEL}\``,
      `- \`LCOV_PATH\`: \`${LCOV_PATH}\``,
      `- \`AI_REVIEW_ENABLED\`: \`${AI_REVIEW_ENABLED}\``,
      `- \`AI_REVIEW_INLINE\`: \`${AI_REVIEW_INLINE}\``,
      `- \`AI_REVIEW_BLOCK_ON_FINDINGS\`: \`${AI_REVIEW_BLOCK_ON_FINDINGS}\``,
      `- Changed files considered: ${changed.length ? changed.map(f => `\`${f}\``).join(', ') : '_(none)_'}`,
      '',
    ].join('\n')
  );

  if (changed.length === 0) {
    message('No source files changed under `src/`.');
    return;
  }

  // Load LCOV & index
  const lcov = await parseLCOV(LCOV_PATH);
  const lcovIndex = new Map<string, LcovFileNorm>(lcov.map(r => [r.file, r]));

  // Coverage stats + offenders
  const stats: FileCoverage[] = [];
  const offenders: string[] = [];
  const suggested = new Set<string>();

  for (const file of changed) {
    const diff = await danger.git.diffForFile(file);
    const diffText = diff?.diff ?? '';
    const touched = extractChangedLineNumbers(diffText);

    const entry = lcovIndex.get(file);
    if (!entry) {
      stats.push({
        file,
        linesFound: 0,
        linesHit: 0,
        filePct: 0,
        newExecLines: 0,
        newCoveredLines: 0,
        newPct: null,
      });
      offenders.push(file);
      continue;
    }

    const details = entry.lines.details || [];
    const linesFound = entry.lines.found || 0;
    const linesHit = entry.lines.hit || 0;
    const filePct = linesFound ? Math.round((linesHit / linesFound) * 100) : 0;

    const instrumentable = new Set<number>(details.map(d => d.line));
    const newLinesInstr = [...touched].filter(n => instrumentable.has(n));
    const newCovered = details.filter(
      d => touched.has(d.line) && d.hit > 0
    ).length;
    const newPct = newLinesInstr.length
      ? Math.round((newCovered / newLinesInstr.length) * 100)
      : null;

    stats.push({
      file,
      linesFound,
      linesHit,
      filePct,
      newExecLines: newLinesInstr.length,
      newCoveredLines: newCovered,
      newPct,
    });

    const effective = newPct ?? filePct;
    if (effective < MIN_FILE_COVERAGE) offenders.push(file);
  }

  // Coverage table
  const table = [
    '### Coverage on changed files',
    '',
    '| File | New Covered/Lines | New % | File Covered/Lines | File % |',
    '|------|-------------------:|------:|--------------------:|-------:|',
    ...stats.map(s => {
      const newStr =
        s.newPct === null ? '—' : `${s.newCoveredLines}/${s.newExecLines}`;
      const newPctStr = s.newPct === null ? '—' : `${s.newPct}%`;
      return `| \`${s.file}\` | ${newStr} | ${newPctStr} | ${s.linesHit}/${s.linesFound} | ${s.filePct}% |`;
    }),
  ].join('\n');
  await post(table);

  // Gate: fail PR if any offender
  if (offenders.length > 0) {
    fail(
      `Coverage below **${MIN_FILE_COVERAGE}%** on new/changed code for ${offenders.length} file(s). Suggestions below.`
    );
    for (const f of offenders.slice(0, MAX_FILES_TO_ANALYZE)) {
      const diff = await danger.git.diffForFile(f);
      const ideas = await aiTestIdeas(f, diff?.diff ?? '');
      await post(`#### AI test ideas for \`${f}\`\n${ideas}`);
      suggested.add(f);
    }
  } else {
    message(`All changed code meets the ${MIN_FILE_COVERAGE}% gate ✅`);
  }

  // Always add test suggestions (top N) even when passing
  for (const f of changed.slice(0, MAX_FILES_TO_ANALYZE)) {
    if (suggested.has(f)) continue;
    const diff = await danger.git.diffForFile(f);
    const ideas = await aiTestIdeas(f, diff?.diff ?? '');
    await post(`#### AI test ideas for \`${f}\`\n${ideas}`);
  }

  // ---------- AI Code Review with correct inline mapping ----------
  if (AI_REVIEW_ENABLED) {
    const diffsForReview: ReviewDiff[] = [];
    for (const f of changed) {
      const d = await danger.git.diffForFile(f);
      if (d?.diff && d.diff.length > 0) {
        diffsForReview.push({
          file: f,
          diff: d.diff,
          added: enumerateAddedLines(d.diff),
        });
      }
    }

    if (diffsForReview.length) {
      const findings = await aiCodeReview(diffsForReview);

      const summary: string[] = [];
      let blocking = 0;

      for (const finding of findings) {
        const rec = diffsForReview.find(d => d.file === finding.file);
        if (!rec) continue;
        const chosen = rec.added.find(a => a.index === finding.index);
        if (!chosen) continue; // model returned an index we didn't expose

        const msg = `${finding.title} — ${finding.body}`;
        if (AI_REVIEW_INLINE) {
          if (finding.severity === 'fail') {
            fail(msg, finding.file, chosen.line);
            blocking++;
          } else if (finding.severity === 'warn') {
            warn(msg, finding.file, chosen.line);
          } else {
            message(msg, finding.file, chosen.line);
          }
        }
        summary.push(
          `- **${finding.severity.toUpperCase()}** \`${finding.file}:${chosen.line}\` — ${finding.title}\n  - ${finding.body}`
        );
      }

      if (summary.length)
        await post(`### AI Code Review\n${summary.join('\n')}`);
      if (AI_REVIEW_BLOCK_ON_FINDINGS && blocking > 0) {
        fail(
          `AI code review reported **${blocking}** blocking finding(s). Please address or justify.`
        );
      }
    }
  }
}

export {};
