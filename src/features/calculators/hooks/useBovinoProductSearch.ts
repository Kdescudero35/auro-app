import { useMemo, useState, useEffect } from 'react';

import { BOVINO_CATALOG } from '../data/catalogoBovinos';
import type { BovinoProduct } from '../types';

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

export function useBovinoProductSearch(query: string): {
  results: BovinoProduct[];
  isFetching: boolean;
} {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const q = normalize(debounced);
    if (!q) return BOVINO_CATALOG;
    return BOVINO_CATALOG.filter(
      (p) =>
        normalize(p.nombre).includes(q) ||
        normalize(p.principioActivo).includes(q),
    );
  }, [debounced]);

  return { results, isFetching: false };
}
