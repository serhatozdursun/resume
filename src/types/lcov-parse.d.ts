declare module 'lcov-parse' {
  export interface LcovLineDetail {
    line: number;
    hit: number;
  }
  export interface LcovLines {
    found: number;
    hit: number;
    details: LcovLineDetail[];
  }
  export interface LcovFile {
    title?: string;
    file: string;
    lines: LcovLines;
  }

  function lcovParse(
    path: string,
    cb: (err: Error | null, data: LcovFile[]) => void
  ): void;

  export default lcovParse;
}
