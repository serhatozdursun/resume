import React, { useEffect, useId, useState } from 'react';

import {
  SkillsContainer,
  Skill,
  SkillName,
  SkillLevel,
  SkillLevelFill,
  SkillsTitle,
  SkillTooltip,
} from './Skills.styles';
import { skillExperienceTitle, skills } from '../data/skills';

export interface SkillsComponentsProps {
  /** When true, omit the section heading (e.g. sidebar uses `SidebarSectionLabel`). */
  hideSectionTitle?: boolean;
}

const skillLabelId = (index: number) => `skill-label-${index}`;

const DESKTOP_MQ = '(min-width: 769px)';

export const SkillsComponents: React.FC<SkillsComponentsProps> = ({
  hideSectionTitle = false,
}) => {
  const tipIdBase = useId();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <SkillsContainer>
      {!hideSectionTitle && <SkillsTitle>Skills</SkillsTitle>}
      {skills.map((skill, index) => {
        const tipText = skillExperienceTitle(skill.experience);
        const tipId = `${tipIdBase}-tip-${index}`;
        const showCustomTip = isDesktop && hoveredRow === index;

        return (
          <Skill
            key={`${skill.name}-${index}`}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
            /* Native tooltip on mobile / when not using custom (fixed layer breaks native title) */
            title={isDesktop ? undefined : tipText}
            aria-describedby={showCustomTip ? tipId : undefined}
          >
            {showCustomTip && (
              <SkillTooltip id={tipId} role='tooltip'>
                {tipText}
              </SkillTooltip>
            )}
            <SkillName id={skillLabelId(index)}>{skill.name}</SkillName>
            <SkillLevel
              role='progressbar'
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={skill.level}
              aria-labelledby={skillLabelId(index)}
            >
              <SkillLevelFill
                data-testid={`${skill.name}-level-fill`}
                $level={skill.level}
              />
            </SkillLevel>
          </Skill>
        );
      })}
    </SkillsContainer>
  );
};
