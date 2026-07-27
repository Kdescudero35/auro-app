import type { AcuiculturaEspecie } from '../types';

export const DOLICAL_DOSIS_POR_ESPECIE: Partial<Record<AcuiculturaEspecie, number>> = {
  TILAPIA: 200,
  COBIA: 60,
  TRUCHA: 120,
};

export const ACUICULTURA_ESPECIES: { value: AcuiculturaEspecie; label: string }[] = [
  { value: 'TILAPIA', label: 'Tilapia' },
  { value: 'COBIA', label: 'Cobia' },
  { value: 'TRUCHA', label: 'Trucha' },
  { value: 'CACHAMA', label: 'Cachama' },
  { value: 'SALMON', label: 'Salmón' },
  { value: 'CAMARON', label: 'Camarón' },
  { value: 'BAGRE', label: 'Bagre' },
];
