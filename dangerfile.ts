// dangerfile.ts
import { message, fail, markdown, danger } from 'danger';
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
  newExecLines: number; // instrumentable changed lines
  newCoveredLines: number; // covered among instrumentable changed lines
  newPct: number | null; // % on changed lines (null when none instrumentable)
}

/* =======================
   Helpers
   ======================= */

// Normalize LCOV to a strict shape with details array present
function normalizeLCOV(data: LcovFile[]): LcovFileNorm[] {
  return data.map(rec => {
    const linesFound =
      (rec as unknown as { lines?: { found?: number } }).lines?.found ?? 0;
    const linesHit =
      (rec as unknown as { lines?: { hit?: number } }).lines?.hit ?? 0;
    const detailsRaw =
      (
        rec as unknown as {
          lines?: { details?: Array<{ line: number; hit: number }> };
        }
      ).lines?.details ?? [];
    const details: LcovLineDetail[] = detailsRaw.map(d => ({
      line: typeof d.line === 'number' ? d.line : 0,
      hit: typeof d.hit === 'number' ? d.hit : 0,
    }));
    return {
      file: (rec as unknown as { file?: string }).file ?? '',
      lines: { found: linesFound, hit: linesHit, details },
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

// Parse unified diff -> set of line numbers (in NEW file) that are added/modified
function extractChangedLineNumbers(diffText: string): Set<number> {
  const out = new Set<number>();
  let newLine = 0;
  const lines = diffText.split('\n');
  for (const l of lines) {
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/.exec(l);
    if (hunk) {
      newLine = parseInt(hunk[1], 10);
      continue;
    }
    if (l.startsWith('+++') || l.startsWith('---')) continue; // headers
    if (l.startsWith('+')) {
      out.add(newLine);
      newLine++;
      continue;
    }
    if (l.startsWith('-')) {
      /* deletion in old file */ continue;
    }
    // context
    newLine++;
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

// Call OpenAI to propose a copy-paste-ready Jest test file (with your prompt style)
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
    const content = res.choices[0]?.message?.content;
    return content ?? '_No AI output._';
  } catch {
    return '_AI suggestions skipped due to API error._';
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

  // Debug section in PR + build log
  console.log('DEBUG', {
    MIN_FILE_COVERAGE,
    MAX_FILES_TO_ANALYZE,
    OPENAI_MODEL,
    LCOV_PATH,
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

  const stats: FileCoverage[] = [];
  const offenders: string[] = [];
  const suggested = new Set<string>(); // to avoid duplicate AI sections

  for (const file of changed) {
    const diff = await danger.git.diffForFile(file);
    const diffText = diff?.diff ?? '';
    const touched = extractChangedLineNumbers(diffText);

    const entry = lcovIndex.get(file);
    if (!entry) {
      // Treat as offender for "new code" gate (no LCOV → effectively unknown coverage)
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

    // new-lines coverage = intersection of changed lines with instrumented lines
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

    const effective = newPct ?? filePct; // prefer new-lines %, fallback to file %
    if (effective < MIN_FILE_COVERAGE) offenders.push(file);
  }

  // Coverage table (new-lines first, then whole-file)
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

  // Gate: fail PR if any offender (blocks merge when Danger check is required)
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

  // Always add suggestions for top N changed files (even when passing)
  for (const f of changed.slice(0, MAX_FILES_TO_ANALYZE)) {
    if (suggested.has(f)) continue;
    const diff = await danger.git.diffForFile(f);
    const ideas = await aiTestIdeas(f, diff?.diff ?? '');
    await post(`#### AI test ideas for \`${f}\`\n${ideas}`);
  }
}

export {};
