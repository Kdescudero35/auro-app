import { JSX, createContext, ReactNode, useContext, useMemo } from 'react';

import { useThemeStore } from '@store/themeStore';

import { ColorScheme, palette, ThemeColors } from './colors';
import { radius, shadows, spacing, typography } from './tokens';

export interface Theme {
  scheme: ColorScheme;
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadows: typeof shadows;
}

const ThemeContext = createContext<Theme | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const scheme = useThemeStore((state) => state.scheme);

  const value = useMemo<Theme>(
    () => ({
      scheme,
      colors: palette[scheme],
      spacing,
      radius,
      typography,
      shadows,
    }),
    [scheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return ctx;
}
