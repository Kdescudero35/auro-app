import { useMemo, useState, useEffect } from 'react';

import { ACUICULTURA_CATALOG } from '../data/catalogoAcuicultura';
import type { AcuiculturaProduct } from '../types';

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

export function useAcuiculturaProductSearch(query: string): {
  results: AcuiculturaProduct[];
  isFetching: boolean;
} {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const q = normalize(debounced);
    if (!q) return ACUICULTURA_CATALOG;
    return ACUICULTURA_CATALOG.filter(
      (p) =>
        normalize(p.nombre).includes(q) ||
        normalize(p.principioActivo).includes(q),
    );
  }, [debounced]);

  return { results, isFetching: false };
}
