import styled from 'styled-components';

interface SkillLevelFillProps {
  $level: number;
}

export const SkillsContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const Skill = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 5px;
  margin-bottom: 11px;
  overflow: visible;

  &:last-child {
    margin-bottom: 0;
  }
`;

/** Desktop-only hover tooltip (native `title` is unreliable over fixed/stacking layers). */
export const SkillTooltip = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  margin-bottom: 6px;
  padding: 6px 8px;
  font-size: 0.72rem;
  line-height: 1.35;
  font-weight: 500;
  color: #f8fafc;
  background: #334155;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 40;
  pointer-events: none;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SkillName = styled.span`
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  padding-right: 2px;

  @media (max-width: 768px) {
    font-size: 0.78rem;
  }
`;

/** Thin competency rail — not a heavy progress bar */
export const SkillLevel = styled.div`
  width: 100%;
  height: 5px;
  box-sizing: border-box;
  border-radius: 999px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.skillBarTrack};
`;

/** Fill — emerald gradient */
export const SkillLevelFill = styled.div<SkillLevelFillProps>`
  height: 100%;
  width: ${({ $level }) => `${$level}%`};
  min-width: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.skillBarFill};
`;

export const SkillsTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.sectionLabel};

  @media (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 12px;
  }
`;
