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

interface ReviewDiff {
  file: string;
  diff: string;
  changedLines: number[]; // new-file line numbers included in this PR
}

type AISeverity = 'info' | 'warn' | 'fail';

interface AIReviewFinding {
  file: string;
  line: number; // must be a changed line in this PR
  severity: AISeverity; // "info" | "warn" | "fail"
  title: string; // short headline
  body: string; // actionable explanation + suggestion
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
  const lines = diffText.split('\n');
  for (const l of lines) {
    const h = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(l);
    if (h) {
      newLine = parseInt(h[1], 10);
      continue;
    }
    if (l.startsWith('+++') || l.startsWith('---')) continue;
    if (l.startsWith('+')) {
      out.add(newLine);
      newLine++;
      continue;
    }
    if (l.startsWith('-')) continue; // old-file deletion; don't advance newLine
    newLine++; // context
  }
  return out;
}

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

/* ---------- AI: Structured code review with inline mapping ---------- */

function extractJSONFromMarkdown(md: string): string | null {
  const codeBlock = /```(?:json)?\s*([\s\S]*?)```/m.exec(md);
  if (codeBlock && codeBlock[1]) return codeBlock[1].trim();
  const trimmed = md.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return trimmed;
  return null;
}

function isAIReviewFinding(x: unknown): x is AIReviewFinding {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as {
    file?: unknown;
    line?: unknown;
    severity?: unknown;
    title?: unknown;
    body?: unknown;
  };
  const fileOk = typeof o.file === 'string' && o.file.length > 0;
  const lineOk =
    typeof o.line === 'number' && Number.isFinite(o.line) && o.line > 0;
  const sevOk =
    o.severity === 'info' || o.severity === 'warn' || o.severity === 'fail';
  const titleOk = typeof o.title === 'string' && o.title.length > 0;
  const bodyOk = typeof o.body === 'string' && o.body.length > 0;
  return fileOk && lineOk && sevOk && titleOk && bodyOk;
}

function nearestLine(target: number, candidates: number[]): number | null {
  if (candidates.length === 0) return null;
  let best = candidates[0];
  let bestDiff = Math.abs(candidates[0] - target);
  for (let i = 1; i < candidates.length; i++) {
    const d = Math.abs(candidates[i] - target);
    if (d < bestDiff) {
      best = candidates[i];
      bestDiff = d;
    }
  }
  return best;
}

async function aiCodeReview(diffs: ReviewDiff[]): Promise<AIReviewFinding[]> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return [];
  const client = new OpenAI({ apiKey: key });

  // Build prompt: include file name, changed lines, and the diff for precision
  const joined = diffs
    .map(
      d =>
        `# FILE: ${d.file}\nCHANGED_LINES: ${d.changedLines.slice(0, 200).join(',')}\n${d.diff}`
    )
    .join('\n\n');
  const trimmed = joined.slice(0, AI_REVIEW_MAX_CHARS);

  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    {
      role: 'system',
      content:
        'You are a senior Software Developer engineer (React + TypeScript expert). ' +
        'Return ONLY a single JSON array of findings; no prose, no backticks. ' +
        'Each finding must be an object with: ' +
        '{ "file": string, "line": number, "severity": "info"|"warn"|"fail", "title": string, "body": string }. ' +
        'The "line" must be one of the CHANGED_LINES for that file. ' +
        'Prefer at most 8 high-signal findings.',
    },
    {
      role: 'user',
      content: trimmed || 'N/A',
    },
  ];

  try {
    const res = await client.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.1,
      messages,
    });
    const raw = res.choices[0]?.message?.content ?? '[]';
    const jsonText = extractJSONFromMarkdown(raw) ?? '[]';
    const parsed: unknown = JSON.parse(jsonText);
    if (!Array.isArray(parsed)) return [];
    // Type-guard and limit
    const findings: AIReviewFinding[] = parsed
      .filter(isAIReviewFinding)
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
  // Changed source files (ignore tests and .d.ts)
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

  // Build coverage stats + offenders
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

  // ---------- AI Code Review with inline comments ----------
  if (AI_REVIEW_ENABLED) {
    // Collect file diffs + changed lines
    const diffs: ReviewDiff[] = [];
    for (const f of changed) {
      const d = await danger.git.diffForFile(f);
      if (d?.diff && d.diff.length > 0) {
        const changedLines = Array.from(extractChangedLineNumbers(d.diff)).sort(
          (a, b) => a - b
        );
        diffs.push({ file: f, diff: d.diff, changedLines });
      }
    }

    if (diffs.length) {
      const findings = await aiCodeReview(diffs); // structured JSON findings

      // Inline comments (exact lines). Adjust to nearest changed line if needed.
      const summaryLines: string[] = [];
      let blockingFindings = 0;

      for (const f of findings) {
        const rec = diffs.find(d => d.file === f.file);
        if (!rec) continue;
        const allowed = rec.changedLines;
        let targetLine = f.line;
        if (!allowed.includes(targetLine)) {
          const nearest = nearestLine(targetLine, allowed);
          if (nearest === null) continue;
          targetLine = nearest;
        }

        const short = `${f.title} — ${f.body}`;
        if (AI_REVIEW_INLINE) {
          if (f.severity === 'fail') {
            fail(short, f.file, targetLine);
            blockingFindings++;
          } else if (f.severity === 'warn') {
            warn(short, f.file, targetLine);
          } else {
            message(short, f.file, targetLine);
          }
        }

        summaryLines.push(
          `- **${f.severity.toUpperCase()}** \`${f.file}:${targetLine}\` — ${f.title}\n  - ${f.body}`
        );
      }

      if (summaryLines.length) {
        await post(
          `### AI Code Review (inline summary)\n${summaryLines.join('\n')}`
        );
      }

      if (AI_REVIEW_BLOCK_ON_FINDINGS && blockingFindings > 0) {
        fail(
          `AI code review reported **${blockingFindings}** blocking finding(s). Please address or justify.`
        );
      }
    }
  }
}

export {};
