// theme.ts
export const theme = {
  colors: {
    primary: '#f3f4f6', // Soft gray
    secondary: '#e5e7eb', // Lighter gray
    accent: '#2563eb', // Blue accent
    background: '#ffffff',
    text: '#222222',
    link: '#e11d48', // Rose for links
    card: '#f9f9fb',
    shadow: 'rgba(80, 80, 80, 0.08)',
    headerBg: '#f3f4f6', // Header background matches page
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
    main: "'Inter', 'Roboto', Arial, sans-serif",
    heading: "'Montserrat', Arial, sans-serif",
  },
};

export type ThemeType = typeof theme;
