import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ColorScheme } from '@theme/colors';

interface ThemeState {
  scheme: ColorScheme;
  toggle: () => void;
  setScheme: (scheme: ColorScheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      scheme: 'dark',
      toggle: () =>
        set((state) => ({
          scheme: state.scheme === 'dark' ? 'light' : 'dark',
        })),
      setScheme: (scheme) => set({ scheme }),
    }),
    {
      name: 'auroapp.theme',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
