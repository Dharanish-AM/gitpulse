// Cyberpunk design tokens

export const theme = {
  colors: {
    primary: '#00f0ff', // Cyan
    secondary: '#ff006e', // Pink
    accent: '#8338ec', // Purple
    success: '#3a86ff', // Lime
    background: '#000000',
    surface: '#1a1a1a',
    border: '#333333',
    text: '#ffffff',
    textSecondary: '#999999',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 240, 255, 0.05)',
    md: '0 4px 6px 0 rgba(0, 240, 255, 0.1)',
    lg: '0 10px 15px 0 rgba(0, 240, 255, 0.15)',
    xl: '0 20px 25px 0 rgba(0, 240, 255, 0.2)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  fonts: {
    mono: '"Fira Code", "Courier New", monospace',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
} as const;

export type Theme = typeof theme;
