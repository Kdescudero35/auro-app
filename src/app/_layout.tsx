import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { JSX, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Header } from '@features/shared/components/Header';
import { useQuotationStore } from '@store/quotationStore';
import { useThemeStore } from '@store/themeStore';
import { palette } from '@theme/colors';
import { ThemeProvider } from '@theme/ThemeProvider';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* noop */
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout(): JSX.Element {
  const [ready, setReady] = useState(false);
  const reset = useQuotationStore((s) => s.reset);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => undefined);
    setReady(true);
  }, []);

  if (!ready) return <></>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ThemedShell onReset={reset} />
            <Toast />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function ThemedShell({ onReset }: { onReset: () => void }): JSX.Element {
  const scheme = useThemeStore((s) => s.scheme);
  const colors = palette[scheme];

  return (
    <>
      <StatusBar style="light" />
      <Header onReset={onReset} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}
      />
    </>
  );
}
