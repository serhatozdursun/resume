// scripts/preview-pr-inline.ts
import type { RequestInit } from 'node-fetch'; // not required on Node 18+, but keeps TS happy

type AddedLine = { index: number; line: number; text: string };

const HUNK_RE = /@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/;

function enumerateAddedLines(diffText: string): AddedLine[] {
  const out: AddedLine[] = [];
  let newLine = 0;
  let idx = 0;
  for (const raw of diffText.split('\n')) {
    const line = raw.replace(/\r$/, '');
    const h = HUNK_RE.exec(line); // tolerant to leading spaces
    if (h) {
      newLine = parseInt(h[1], 10);
      continue;
    }
    if (line.startsWith('+++') || line.startsWith('---')) continue;

    const first = line[0];
    if (first === '+') {
      if (line.startsWith('+++')) continue; // skip file header
      out.push({ index: idx++, line: newLine, text: line.slice(1) });
      newLine++;
      continue;
    }
    if (first === '-') continue; // deletion in old file
    newLine++; // context/blank
  }
  return out;
}

function parseArgs() {
  const arg = process.env.PREVIEW_PR || '';
  const urlMatch = arg.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/i);
  if (urlMatch)
    return {
      owner: urlMatch[1],
      repo: urlMatch[2],
      number: Number(urlMatch[3]),
    };

  const owner = process.argv[2];
  const repo = process.argv[3];
  const number = Number(process.argv[4]);

  if (owner && repo && number) return { owner, repo, number };

  console.error(
    'Usage: ts-node scripts/preview-pr-inline.ts <PR_URL>  OR  <owner> <repo> <number>'
  );
  process.exit(1);
}

async function fetchPRDiff(
  owner: string,
  repo: string,
  number: number
): Promise<string> {
  const token =
    process.env.GITHUB_TOKEN || process.env.DANGER_GITHUB_API_TOKEN || '';
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${number}`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3.diff',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  // Node 18+ has global fetch
  const res = await fetch(url, { headers } as RequestInit);
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
  return await res.text();
}

function splitFilesFromUnifiedDiff(
  all: string
): Array<{ file: string; diff: string }> {
  // Split by "diff --git" but keep each chunk's headers/hunks
  const chunks = all
    .split(/\ndiff --git /)
    .map((c, i) => (i === 0 ? c : 'diff --git ' + c));
  const files: Array<{ file: string; diff: string }> = [];

  for (const chunk of chunks) {
    // Find +++ b/<path>
    const m = chunk.match(/\n\+\+\+ b\/([^\n]+)\n/);
    if (!m) continue;
    const file = m[1];
    // Keep the whole chunk (enumerator ignores headers anyway)
    files.push({ file, diff: chunk });
  }
  return files;
}

async function main() {
  const { owner, repo, number } = parseArgs();
  console.log(`Fetching diff for ${owner}/${repo}#${number} ...`);
  const raw = await fetchPRDiff(owner, repo, number);
  const files = splitFilesFromUnifiedDiff(raw);

  if (!files.length) {
    console.log('No file diffs found.');
    return;
  }

  const includePrefix = process.env.INCLUDE_PREFIX || 'src/'; // filter like Danger does
  for (const f of files) {
    if (includePrefix && !f.file.startsWith(includePrefix)) continue;

    const added = enumerateAddedLines(f.diff);
    if (!added.length) continue;

    console.log(`\nFILE: ${f.file}`);
    console.log(
      'first hunk:',
      f.diff.split('\n').find(l => l.includes('@@')) || '(none)'
    );
    for (const a of added.slice(0, 200)) {
      console.log(`${a.index} -> ${a.line} : ${a.text}`);
    }
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
