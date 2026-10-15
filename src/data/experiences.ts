import { experienceRows } from './experiencesData';
import type { ExperienceRow } from './experiencesData';

export interface ExperienceItem extends ExperienceRow {
  description: string;
}

const formatInlineEmphasis = (text: string): string =>
  text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const toDescription = (bullets: readonly string[]): string =>
  bullets.map(item => `<p>• ${formatInlineEmphasis(item)}</p>`).join('');

export const experiences: ExperienceItem[] = experienceRows.map(experience => ({
  ...experience,
  description: toDescription(experience.bullets),
}));
