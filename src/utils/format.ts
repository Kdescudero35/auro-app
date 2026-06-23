/**
 * Utilidades de formateo numérico y de moneda.
 * Locale: es-CO.
 */

const decimalFormatter = new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 0,
});

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return '0';
  return decimalFormatter.format(value);
};

export const formatInteger = (value: number): string => {
  if (!Number.isFinite(value)) return '0';
  return integerFormatter.format(value);
};

export const formatCurrency = (value: number): string => {
  if (!Number.isFinite(value)) return '$ 0';
  return currencyFormatter.format(value);
};

/**
 * Convierte una cantidad en gramos a la unidad más legible (g o kg).
 */
export const humanizeMass = (
  value: number,
  unit: 'g' | 'kg',
): { value: number; unit: 'g' | 'kg' } => {
  if (unit === 'g' && value >= 1000) {
    return { value: value / 1000, unit: 'kg' };
  }
  return { value, unit };
};
