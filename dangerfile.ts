// dangerfile.ts
import { message, warn, markdown, danger } from 'danger';
import lcovParse, { LcovFile } from 'lcov-parse';
import fs from 'fs';
import OpenAI from 'openai';

// Configurable via env
const MIN_FILE_COVERAGE: number = parseInt(
  process.env.MIN_FILE_COVERAGE || '80',
  10
);
const MAX_FILES_TO_ANALYZE: number = parseInt(
  process.env.MAX_FILES_TO_ANALYZE || '3',
  10
);
const OPENAI_MODEL: string = process.env.OPENAI_MODEL || 'gpt-4o-mini';
// Hardcoded defaults
const LCOV_PATH: string = 'coverage/lcov.info';

interface FileCoverage {
  file: string;
  linesFound: number;
  linesHit: number;
  pct: number;
}

async function parseLCOV(path: string): Promise<LcovFile[]> {
  return new Promise<LcovFile[]>((resolve, reject) => {
    if (!fs.existsSync(path)) return resolve([]);
    lcovParse(path, (err, data) => (err ? reject(err) : resolve(data || [])));
  });
}

async function aiTestIdeas(file: string, diffText: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return '_AI suggestions skipped: missing OPENAI_API_KEY._';
  }
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `
You are a senior QA engineer. Propose 3 concrete unit tests for the following diff.
Each test should have:
- a short name,
- setup steps,
- exact assertions / branches covered,
- edge cases.

Focus on changed logic and untested branches.
File: ${file}

Diff:
${diffText || 'N/A'}
  `;
  const res = await client.chat.completions.create({
    model: OPENAI_MODEL,
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }],
  });
  return res.choices?.[0]?.message?.content || '_No AI output._';
}

export default async function run(): Promise<void> {
  const changed = [...danger.git.modified_files, ...danger.git.created_files];
  const lcovData = await parseLCOV(LCOV_PATH);

  const stats: FileCoverage[] = [];
  for (const f of changed) {
    const entry = lcovData.find((e: LcovFile) => e.file === f);
    if (!entry) continue;
    const linesFound = entry.lines?.found || 0;
    const linesHit = entry.lines?.hit || 0;
    const pct = linesFound ? Math.round((linesHit / linesFound) * 100) : 0;
    stats.push({ file: f, linesFound, linesHit, pct });
  }

  if (stats.length === 0) {
    message('No coverage info for changed files.');
    return;
  }

  stats.sort((a, b) => a.pct - b.pct);

  const table = [
    '### Coverage on changed files',
    '| File | Covered/Lines | % |',
    '|------|---------------|---|',
    ...stats.map(
      s => `| \`${s.file}\` | ${s.linesHit}/${s.linesFound} | ${s.pct}% |`
    ),
  ].join('\n');
  markdown(table);

  const offenders = stats
    .filter(s => s.pct < MIN_FILE_COVERAGE)
    .slice(0, MAX_FILES_TO_ANALYZE);

  if (offenders.length) {
    warn(`Coverage below ${MIN_FILE_COVERAGE}% on some changed files.`);
    for (const off of offenders) {
      const diff = await danger.git.diffForFile(off.file);
      const ideas = await aiTestIdeas(off.file, diff?.diff || '');
      markdown(`#### AI test ideas for \`${off.file}\`\n${ideas}`);
    }
  } else {
    message(`All changed files meet the ${MIN_FILE_COVERAGE}% threshold ✅`);
  }
}

// Required so TS compiler treats this as a module
export {};
