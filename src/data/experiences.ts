import { experienceRows } from './experiencesData';

export interface ExperienceItem {
  title: string;
  company: string;
  companyLogo: string;
  companyWebsite: string;
  dateRange: string;
  bullets: readonly string[];
  description: string;
}

const formatInlineEmphasis = (text: string): string =>
  text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const toDescription = (bullets: readonly string[]): string =>
  bullets.map(item => `<p>• ${formatInlineEmphasis(item)}</p>`).join('');

export const experiences: ExperienceItem[] = experienceRows.map(
  ([title, company, companyLogo, companyWebsite, dateRange, bullets]) => ({
    title,
    company,
    companyLogo,
    companyWebsite,
    dateRange,
    bullets,
    description: toDescription(bullets),
  })
);
