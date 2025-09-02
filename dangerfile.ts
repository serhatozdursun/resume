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

const AI_REVIEW_ENABLED: boolean =
  (process.env.AI_REVIEW_ENABLED ?? '1') === '1';
const AI_REVIEW_MAX_CHARS: number = parseInt(
  process.env.AI_REVIEW_MAX_CHARS || '100000',
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
}

/* =======================
   Helpers
   ======================= */

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
      line: d.line ?? 0,
      hit: d.hit ?? 0,
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
    lcovParse(path, (err: Error | null, data: LcovFile[]) =>
      err ? reject(err) : resolve(normalizeLCOV(data || []))
    );
  });
}

// unified-diff → set of new-file line numbers added/modified
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
    if (l.startsWith('-')) continue;
    newLine++;
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

/* ---------- AI helpers ---------- */

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

// Ask the AI to do a general code review on the PR diff.
// Starts with "FINDINGS_COUNT: N" so we can optionally block on findings.
async function aiCodeReview(diffs: ReviewDiff[]): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return '_AI review skipped: missing OPENAI_API_KEY._';
  const client = new OpenAI({ apiKey: key });

  const joined = diffs.map(d => `# ${d.file}\n${d.diff}`).join('\n\n');
  const trimmed = joined.slice(0, AI_REVIEW_MAX_CHARS);

  const messages: Array<{ role: 'system' | 'user'; content: string }> = [
    {
      role: 'system',
      content:
        'You are a senior Software Developer engineer (React + TypeScript expert). ' +
        'Review the diff and report actionable findings. ' +
        "Start with a single line: 'FINDINGS_COUNT: N' (N = number of non-trivial issues). " +
        'Then provide a concise markdown review with sections: Bugs, Types/Nullability, React/State, ' +
        'Accessibility, Security, Performance, Maintainability, Test Gaps, Quick Wins. ' +
        'Reference file names and line hints from the diff.',
    },
    {
      role: 'user',
      content: `Review the following PR diff and follow the format above:\n\n${trimmed || 'N/A'}`,
    },
  ];

  try {
    const res = await client.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.1,
      messages,
    });
    return res.choices[0]?.message?.content ?? '_No AI review output._';
  } catch {
    return '_AI review skipped due to API error._';
  }
}

function parseFindingsCount(review: string): number | null {
  const m = /^FINDINGS_COUNT:\s*(\d+)/m.exec(review);
  return m ? parseInt(m[1], 10) : null;
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
    AI_REVIEW_MAX_CHARS,
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

  // AI code review for the diff (summary)
  if (AI_REVIEW_ENABLED) {
    const diffs: ReviewDiff[] = [];
    for (const f of changed) {
      const d = await danger.git.diffForFile(f);
      if (d?.diff && d.diff.length > 0) diffs.push({ file: f, diff: d.diff });
    }
    if (diffs.length) {
      const review = await aiCodeReview(diffs);
      await post(`### AI Code Review\n${review}`);

      if (AI_REVIEW_BLOCK_ON_FINDINGS) {
        const count = parseFindingsCount(review);
        if (count !== null && count > 0) {
          fail(
            `AI code review reported **${count}** finding(s). Please address or justify.`
          );
        }
      }
    }
  }
}

export {};
