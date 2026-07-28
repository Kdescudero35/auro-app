/**
 * Kill switch remoto — ver docs/kill-switch.md para el flujo completo.
 *
 * TODO: reemplazar FIREBASE_PROJECT_ID y FIREBASE_WEB_API_KEY con los valores
 * reales del proyecto Firebase (Project Settings → General). La Web API Key
 * no es secreta (mismo modelo de confianza que google-services.json): la
 * seguridad real la da la regla de Firestore (solo lectura de este documento).
 */
const FIREBASE_PROJECT_ID = 'auroapp-control';
const FIREBASE_WEB_API_KEY = 'AIzaSyD6L9Vk_RPnXbqThgeyXubN7GttRI5ioTM';

export const KILL_SWITCH_ENDPOINT =
  `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}` +
  `/databases/(default)/documents/app_config/killswitch?key=${FIREBASE_WEB_API_KEY}`;

/** Tiempo máximo de espera por una respuesta antes de considerar el fetch fallido. */
export const KILL_SWITCH_FETCH_TIMEOUT_MS = 5_000;

/**
 * Tiempo máximo que se confía en el último valor cacheado cuando el fetch falla
 * (sin conexión, servidor caído). Pasado este tiempo sin un fetch exitoso, la
 * app vuelve a permitir el uso (fail-open) en vez de quedar bloqueada indefinidamente
 * por una lectura vieja.
 */
export const KILL_SWITCH_MAX_CACHE_AGE_MS = 24 * 60 * 60 * 1000;

/**
 * Frecuencia de re-chequeo mientras la app está en primer plano. Cambiar este
 * valor requiere una nueva compilación (no hay actualización OTA en este proyecto).
 */
export const KILL_SWITCH_POLL_INTERVAL_MS = 60_000;

export const KILL_SWITCH_DEFAULT_MESSAGE =
  'Tu acceso a la aplicación ha sido suspendido temporalmente. Contacta al administrador para regularizar el servicio.';
