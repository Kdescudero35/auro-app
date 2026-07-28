import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RemoteConfigState {
  /** Último valor conocido del kill switch remoto. Fail-open por defecto. */
  enabled: boolean;
  message?: string;
  /** Timestamp del último fetch exitoso, o null si nunca hubo uno. */
  lastCheckedAt: number | null;

  setResult: (result: { enabled: boolean; message?: string }) => void;
  reset: () => void;
}

export const useRemoteConfigStore = create<RemoteConfigState>()(
  persist(
    (set) => ({
      enabled: true,
      message: undefined,
      lastCheckedAt: null,

      setResult: ({ enabled, message }) =>
        set({ enabled, message, lastCheckedAt: Date.now() }),

      reset: () => set({ enabled: true, message: undefined, lastCheckedAt: null }),
    }),
    {
      name: 'auroapp.remoteConfig',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
