import { useMemo, useState, useEffect } from 'react';

import { POSTURA_CATALOG } from '../data/catalogoPostura';
import type { PosturaProduct } from '../types';

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

export function usePosturaProductSearch(query: string): {
  results: PosturaProduct[];
  isFetching: boolean;
} {
  const [debounced, setDebounced] = useState(query);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    const q = normalize(debounced);
    if (!q) return POSTURA_CATALOG;
    return POSTURA_CATALOG.filter(
      (p) =>
        normalize(p.nombre).includes(q) ||
        normalize(p.principioActivo).includes(q) ||
        normalize(p.indicacionUso).includes(q),
    );
  }, [debounced]);

  return { results, isFetching: false };
}
