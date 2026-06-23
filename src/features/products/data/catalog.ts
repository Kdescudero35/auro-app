import type { Product } from '../types';

/**
 * Catálogo estático.
 * En la siguiente fase se reemplazará por endpoint remoto;
 * la firma de los tipos no debe cambiar (contrato).
 */
export const PRODUCTS_CATALOG: Product[] = [
  {
    id: 'q-fos',
    nombre: 'Q-FOS',
    principioActivo: 'Fosfomicina Cálcica 60%',
    dosis: 320,
    unidad: 'g/Ton',
    categorias: ['pollo-engorde', 'gallina-postura', 'porcicultura'],
    tiempoRetiro: 'Carne: 7 días. No administrar en ponedoras comerciales.',
    presentaciones: [
      { label: 'Envases de 1 Kg', size: 1, unit: 'kg' },
      { label: 'Sacos de 25 Kg', size: 25, unit: 'kg' },
    ],
    formula:
      'Consumo alimento corral diario (kg) × Dosis (g/Ton) ÷ 1.000 × días de tratamiento',
  },
  {
    id: 'aminoacidos-plus',
    nombre: 'Aminoacidos Plus',
    principioActivo: 'Mezcla de aminoácidos esenciales 35%',
    dosis: 1000,
    unidad: 'ml/Ton',
    categorias: ['pollo-engorde', 'gallina-postura', 'porcicultura', 'ganaderia'],
    tiempoRetiro: 'No requiere período de retiro.',
    presentaciones: [
      { label: 'Bidón de 5 L', size: 5, unit: 'L' },
      { label: 'Bidón de 20 L', size: 20, unit: 'L' },
    ],
    formula:
      'Consumo agua diario (L) × Dosis (ml/Ton) ÷ 1.000 × días de tratamiento',
  },
  {
    id: 'enroflox-10',
    nombre: 'Enroflox 10%',
    principioActivo: 'Enrofloxacino 10%',
    dosis: 100,
    unidad: 'ml/Ton',
    categorias: ['pollo-engorde', 'porcicultura'],
    tiempoRetiro: 'Carne: 10 días. Huevo: contraindicado.',
    presentaciones: [
      { label: 'Frascos de 1 L', size: 1, unit: 'L' },
      { label: 'Bidón de 5 L', size: 5, unit: 'L' },
    ],
    formula:
      'Consumo agua diario (L) × Dosis (ml/Ton) ÷ 1.000 × días de tratamiento',
  },
  {
    id: 'tilmico-25',
    nombre: 'Tilmico 25%',
    principioActivo: 'Tilmicosina Fosfato 25%',
    dosis: 400,
    unidad: 'g/Ton',
    categorias: ['pollo-engorde', 'porcicultura'],
    tiempoRetiro: 'Carne: 12 días. Huevo: contraindicado.',
    presentaciones: [
      { label: 'Envases de 1 Kg', size: 1, unit: 'kg' },
      { label: 'Sacos de 25 Kg', size: 25, unit: 'kg' },
    ],
    formula:
      'Consumo alimento corral diario (kg) × Dosis (g/Ton) ÷ 1.000 × días de tratamiento',
  },
  {
    id: 'electrolitos-aurof',
    nombre: 'Electrolitos AuroF',
    principioActivo: 'Electrolitos + Vitaminas hidrosolubles',
    dosis: 500,
    unidad: 'g/Ton',
    categorias: ['pollo-engorde', 'gallina-postura'],
    tiempoRetiro: 'No requiere período de retiro.',
    presentaciones: [
      { label: 'Envases de 1 Kg', size: 1, unit: 'kg' },
      { label: 'Sacos de 10 Kg', size: 10, unit: 'kg' },
    ],
    formula:
      'Consumo agua diario (L) × Dosis (g/Ton) ÷ 1.000 × días de tratamiento',
  },
  {
    id: 'desinfect-x',
    nombre: 'Desinfect X',
    principioActivo: 'Glutaraldehído + Cloruro de Benzalconio',
    dosis: 5,
    unidad: 'ml/L',
    categorias: ['bioseguridad'],
    tiempoRetiro: 'No aplica (uso ambiental).',
    presentaciones: [
      { label: 'Bidón de 5 L', size: 5, unit: 'L' },
      { label: 'Bidón de 20 L', size: 20, unit: 'L' },
    ],
    formula: 'Volumen total de solución (L) × Dosis (ml/L)',
  },
  {
    id: 'vita-fish',
    nombre: 'Vita Fish',
    principioActivo: 'Vitamina C + Premix acuícola',
    dosis: 2000,
    unidad: 'g/Ton',
    categorias: ['acuicultura'],
    tiempoRetiro: 'No requiere período de retiro.',
    presentaciones: [
      { label: 'Sacos de 5 Kg', size: 5, unit: 'kg' },
      { label: 'Sacos de 25 Kg', size: 25, unit: 'kg' },
    ],
    formula: 'Biomasa total (Ton) × Dosis (g/Ton)',
  },
];
