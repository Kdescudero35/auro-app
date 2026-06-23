/**
 * Tipos del dominio de cotización.
 */
import type { ProductCategory } from '@features/products/types';

export interface QuotationItem {
  id: string;
  /** Nombre del producto (ej: "Q-FOS") */
  producto: string;
  /** Identificador del producto fuente */
  productoId: string;
  /** Especialidad o categoría legible (ej: "Pollo De Engorde") */
  especialidad: string;
  /** Categoría técnica */
  categoria: ProductCategory;
  /** Cantidad requerida calculada */
  cantidadRequerida: number;
  /** Unidad de la cantidad (g, kg, L, ml) */
  cantidadUnidad: 'g' | 'kg' | 'L' | 'ml';
  /** Presentación seleccionada */
  presentacion: string;
  /** Opciones de presentación disponibles */
  presentacionesDisponibles: string[];
  /** Precio unitario por presentación */
  precioUnitario: number;
  /** Info técnica para el PDF */
  principioActivo?: string;
  formaAdministracion?: string;
  tiempoRetiro?: string;
}

export interface QuotationClient {
  clientName: string;
  farmName: string;
  vendorName: string;
}

export interface QuotationDocument extends QuotationClient {
  items: QuotationItem[];
  total: number;
  date: string;
}
