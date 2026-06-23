import { useMemo, useState, useEffect } from 'react';

import { POLLO_ENGORDE_CATALOG } from '../data/catalogoPolloEngorde';
import type { PolloEngordeProduct } from '../types';

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

export function usePolloEngordeProductSearch(query: string): {
  results: PolloEngordeProduct[];
  isFetching: boolean;
} {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const q = normalize(debounced);
    if (!q) return [];
    return POLLO_ENGORDE_CATALOG.filter(
      (p) =>
        normalize(p.nombre).includes(q) ||
        normalize(p.principioActivo).includes(q) ||
        normalize(p.indicacionUso).includes(q),
    );
  }, [debounced]);

  return { results, isFetching: false };
}
