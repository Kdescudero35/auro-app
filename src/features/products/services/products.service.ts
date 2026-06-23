import { PRODUCTS_CATALOG } from '../data/catalog';
import type { Product, ProductCategory } from '../types';

/**
 * Capa de servicio para productos.
 *
 * Diseñada para ser reemplazada por llamadas HTTP sin cambiar
 * la firma pública. Hoy lee del catálogo estático; mañana
 * apuntará a un endpoint y devolverá la misma Promise<Product[]>.
 */

const SIMULATED_LATENCY_MS = 120;

const simulateNetwork = <T>(value: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));

export const productsService = {
  async getAll(): Promise<Product[]> {
    return simulateNetwork(PRODUCTS_CATALOG);
  },

  async getByCategory(category: ProductCategory): Promise<Product[]> {
    const filtered = PRODUCTS_CATALOG.filter((p) => p.categorias.includes(category));
    return simulateNetwork(filtered);
  },

  async getById(id: string): Promise<Product | null> {
    const found = PRODUCTS_CATALOG.find((p) => p.id === id) ?? null;
    return simulateNetwork(found);
  },

  /**
   * Búsqueda predictiva con filtrado local.
   * Tolerante a acentos, mayúsculas y coincidencia parcial.
   */
  async search(query: string, category?: ProductCategory): Promise<Product[]> {
    const normalized = normalize(query);
    if (!normalized) return [];

    const pool = category
      ? PRODUCTS_CATALOG.filter((p) => p.categorias.includes(category))
      : PRODUCTS_CATALOG;

    const result = pool.filter((p) => {
      return (
        normalize(p.nombre).includes(normalized) ||
        normalize(p.principioActivo).includes(normalized)
      );
    });

    return simulateNetwork(result);
  },
};

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
