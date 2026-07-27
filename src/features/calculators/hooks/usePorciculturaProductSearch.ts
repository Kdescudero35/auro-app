import { useMemo, useState, useEffect } from 'react';

import { PORCICULTURA_CATALOG } from '../data/catalogoPorcicultura';
import type { PorciculturaProduct } from '../types';

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

export function usePorciculturaProductSearch(query: string): {
  results: PorciculturaProduct[];
  isFetching: boolean;
} {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const q = normalize(debounced);
    if (!q) return PORCICULTURA_CATALOG;
    return PORCICULTURA_CATALOG.filter(
      (p) =>
        normalize(p.nombre).includes(q) ||
        normalize(p.principioActivo).includes(q) ||
        normalize(p.indicacionUso).includes(q),
    );
  }, [debounced]);

  return { results, isFetching: false };
}
