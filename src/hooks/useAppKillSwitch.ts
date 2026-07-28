import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { KILL_SWITCH_MAX_CACHE_AGE_MS, KILL_SWITCH_POLL_INTERVAL_MS } from '@constants/remoteConfig';
import { fetchKillSwitchConfig } from '@services/remoteConfigApi';
import { useRemoteConfigStore } from '@store/remoteConfigStore';

export type AppKillSwitchStatus = 'checking' | 'allowed' | 'blocked';

export interface AppKillSwitchResult {
  status: AppKillSwitchStatus;
  message?: string;
}

/**
 * Único punto de decisión de la app sobre si debe mostrar el contenido normal
 * o la pantalla de mantenimiento/bloqueo. Ninguna otra pantalla debe hablar
 * directamente con remoteConfigApi/remoteConfigStore.
 *
 * Política fail-open: si el fetch falla, se usa el último valor cacheado
 * mientras no tenga más de KILL_SWITCH_MAX_CACHE_AGE_MS de antigüedad; pasado
 * ese tiempo (o si nunca hubo un fetch exitoso), se permite el uso de la app.
 */
export function useAppKillSwitch(): AppKillSwitchResult {
  const { enabled, message, lastCheckedAt, setResult } = useRemoteConfigStore();

  const query = useQuery({
    queryKey: ['kill-switch'],
    queryFn: fetchKillSwitchConfig,
    refetchInterval: KILL_SWITCH_POLL_INTERVAL_MS,
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (query.data) {
      setResult(query.data);
    }
  }, [query.data, setResult]);

  if (query.isLoading && lastCheckedAt === null) {
    return { status: 'checking' };
  }

  const cacheIsFresh =
    lastCheckedAt !== null && Date.now() - lastCheckedAt < KILL_SWITCH_MAX_CACHE_AGE_MS;

  // Fail-open: sin cache vigente (o sin fetch exitoso nunca), se permite el uso.
  const effectiveEnabled = cacheIsFresh ? enabled : true;

  return {
    status: effectiveEnabled ? 'allowed' : 'blocked',
    message,
  };
}
