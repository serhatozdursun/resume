// theme.ts — balanced neutrals + blue for links/interactions, green for skill fills
export const theme = {
  colors: {
    primary: '#F1F5F9',
    secondary: '#E5E7EB',
    accent: '#2563EB',
    background: '#F8FAFC',
    text: '#1F2937',
    link: '#2563EB',
    highlight: '#1D4ED8',
    card: '#FFFFFF',
    /** Default soft elevation for hover / secondary depth */
    shadow: 'rgba(15, 23, 42, 0.06)',
    /** Major cards — light, premium */
    cardShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
    headerBg: 'rgba(248, 250, 252, 0.92)',
    skillBarTrack: '#E5E7EB',
    skillBarFill: 'linear-gradient(90deg, #10B981, #34D399)',
    sectionLabel: '#64748B',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  breakpoints: {
    mobile: '768px',
  },
  font: {
    main: "var(--font-inter), 'Roboto', Arial, sans-serif",
    heading: 'var(--font-montserrat), Arial, sans-serif',
  },
};

export type ThemeType = typeof theme;
