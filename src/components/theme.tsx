// theme.ts
export const theme = {
  colors: {
    primary: '#F5F5F5', // Main color
    secondary: '#F3F1EC', // Example secondary color
    background: '#ffffff', // Background color
    text: '#000000', // Text color
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  breakpoints: {
    mobile: '768px',
  },
};

// Define the theme's TypeScript type
export type ThemeType = typeof theme;
