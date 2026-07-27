import { useMemo, useState, useEffect } from 'react';

import { BIOSEGURIDAD_CATALOG } from '../data/catalogoBioseguridad';
import type { BioseguridadProduct, BioseguridadTipoProduccion } from '../types';

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

export function useBioseguridadProductSearch(
  query: string,
  tipoProduccion: BioseguridadTipoProduccion,
): {
  results: BioseguridadProduct[];
  isFetching: boolean;
} {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const porTipo = BIOSEGURIDAD_CATALOG.filter((p) => p.tipoProduccion === tipoProduccion);
    const q = normalize(debounced);
    if (!q) return porTipo;
    return porTipo.filter(
      (p) =>
        normalize(p.nombre).includes(q) ||
        normalize(p.indicacionUso).includes(q) ||
        normalize(p.principioActivo).includes(q),
    );
  }, [debounced, tipoProduccion]);

  return { results, isFetching: false };
}
