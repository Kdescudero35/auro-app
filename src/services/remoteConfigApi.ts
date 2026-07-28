import { KILL_SWITCH_ENDPOINT, KILL_SWITCH_FETCH_TIMEOUT_MS } from '@constants/remoteConfig';

export interface KillSwitchConfig {
  enabled: boolean;
  message?: string;
}

export class RemoteConfigFetchError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RemoteConfigFetchError';
  }
}

interface FirestoreDocumentResponse {
  fields?: {
    enabled?: { booleanValue?: boolean };
    message?: { stringValue?: string };
  };
}

/**
 * Lee el documento de kill switch en Firestore vía REST plano (sin SDK nativo).
 * La respuesta viene en el formato tipado de Firestore, no JSON plano.
 */
export async function fetchKillSwitchConfig(): Promise<KillSwitchConfig> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), KILL_SWITCH_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(KILL_SWITCH_ENDPOINT, { signal: controller.signal });

    if (!response.ok) {
      throw new RemoteConfigFetchError(`HTTP ${response.status}`);
    }

    const json = (await response.json()) as FirestoreDocumentResponse;
    const fields = json.fields ?? {};

    // Si el campo no existe en el documento, se asume habilitado (fail-open).
    const enabled = fields.enabled?.booleanValue ?? true;
    const message = fields.message?.stringValue;

    return { enabled, message };
  } catch (error) {
    if (error instanceof RemoteConfigFetchError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new RemoteConfigFetchError('Timeout al consultar el kill switch remoto');
    }
    throw new RemoteConfigFetchError(
      error instanceof Error ? error.message : 'Error desconocido al consultar el kill switch remoto',
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
