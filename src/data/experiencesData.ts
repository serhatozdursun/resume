import experienceData from './experienceEntries.json';

export interface ExperienceRow {
  readonly title: string;
  readonly company: string;
  readonly companyLogo: string;
  readonly companyWebsite: string;
  readonly dateRange: string;
  readonly bullets: readonly string[];
}

export const experienceRows: readonly ExperienceRow[] = experienceData;
