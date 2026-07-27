import type { BovinoEtapa } from '../types';

export interface ParametroBovino {
  etapa: BovinoEtapa;
  porcentajeMs: number;
  porcentajeAgua: number;
}

export const PARAMETROS_BOVINOS: ParametroBovino[] = [
  { etapa: 'Ternero', porcentajeMs: 0.025, porcentajeAgua: 0.1 },
  { etapa: 'Levante', porcentajeMs: 0.025, porcentajeAgua: 0.1 },
  { etapa: 'Ceba', porcentajeMs: 0.024, porcentajeAgua: 0.09 },
  { etapa: 'Horro', porcentajeMs: 0.02, porcentajeAgua: 0.09 },
  { etapa: 'Vaca leche', porcentajeMs: 0.035, porcentajeAgua: 0.12 },
];
