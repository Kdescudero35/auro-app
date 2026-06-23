/**
 * Tipos del catálogo de productos farmacéuticos veterinarios.
 */

export type DosageUnit = 'g/Ton' | 'mg/Kg' | 'ml/L' | 'g/L' | 'ml/Ton';

export type ProductCategory =
  | 'pollo-engorde'
  | 'gallina-postura'
  | 'porcicultura'
  | 'ganaderia'
  | 'acuicultura'
  | 'bioseguridad';

export interface ProductPresentation {
  /** Etiqueta legible para el usuario (ej: "Envases de 1 Kg") */
  label: string;
  /** Tamaño numérico en gramos o ml */
  size: number;
  /** Unidad de la presentación */
  unit: 'kg' | 'g' | 'L' | 'ml';
}

export interface Product {
  id: string;
  nombre: string;
  principioActivo: string;
  /** Dosis recomendada */
  dosis: number;
  /** Unidad de dosificación */
  unidad: DosageUnit;
  /** Categorías para las que aplica el producto */
  categorias: ProductCategory[];
  /** Tiempo de retiro en alimento de origen animal */
  tiempoRetiro: string;
  /** Presentaciones comerciales */
  presentaciones: ProductPresentation[];
  /** Fórmula de cálculo asociada (descripción técnica) */
  formula?: string;
}
