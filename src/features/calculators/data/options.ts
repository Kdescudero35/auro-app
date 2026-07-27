import type { CalculatorOption } from '../types';

export const CALCULATOR_OPTIONS: CalculatorOption[] = [
  {
    id: 'pollo-engorde',
    title: 'Pollo de Engorde',
    description: 'Sugerencias por día, consumo y dosis total acumulada',
    emoji: '🐔',
    enabled: true,
  },
  {
    id: 'gallina-postura',
    title: 'Gallina de Postura',
    description: 'Sugerencias por semana, control de peso e insumos',
    emoji: '🥚',
    enabled: true,
  },
  {
    id: 'porcicultura',
    title: 'Porcicultura',
    description: 'Cálculos por corral, peso corporal y consumo',
    emoji: '🐷',
    enabled: true,
  },
  {
    id: 'ganaderia',
    title: 'Ganadería (Bovinos)',
    description: 'Consumo de Materia Seca CMS y productos inyectables',
    emoji: '🐄',
    enabled: false,
  },
  {
    id: 'acuicultura',
    title: 'Acuicultura',
    description: 'Piscicultura intensiva, biomasa y dosificación de vacunas',
    emoji: '🐟',
    enabled: false,
  },
  {
    id: 'bioseguridad',
    title: 'Bioseguridad',
    description: 'Desinfección de galpones, aspersión y sanitizantes',
    emoji: '🛡️',
    enabled: false,
  },
];
