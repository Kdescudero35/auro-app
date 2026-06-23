/**
 * Paleta corporativa AuroApp.
 * Definida una sola vez y consumida desde el ThemeProvider.
 */

export const palette = {
  // Dark theme (default)
  dark: {
    background: '#081633',
    surface: '#1C2B47',
    surfaceElevated: '#22324F',
    primary: '#16A34A',
    primaryDark: '#15803D',
    primaryLight: '#22C55E',
    secondary: '#60A5FA',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#334155',
    borderSubtle: '#1E293B',
    danger: '#EF4444',
    dangerDark: '#B91C1C',
    success: '#16A34A',
    warning: '#F59E0B',
    overlay: 'rgba(0, 0, 0, 0.5)',
    headerBackground: '#16A34A',
  },
  // Light theme
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceElevated: '#F1F5F9',
    primary: '#16A34A',
    primaryDark: '#15803D',
    primaryLight: '#22C55E',
    secondary: '#2563EB',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    borderSubtle: '#F1F5F9',
    danger: '#DC2626',
    dangerDark: '#991B1B',
    success: '#16A34A',
    warning: '#F59E0B',
    overlay: 'rgba(0, 0, 0, 0.3)',
    headerBackground: '#16A34A',
  },
} as const;

export type ColorScheme = keyof typeof palette;
export type ThemeColors = (typeof palette)['dark'];
