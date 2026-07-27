import type { PorciculturaCategoria } from '../types';

export interface DatosPorcicultura {
  edadSemanas: number;
  pesoKg: number;
  consumoAlimentoKgDia: number;
  consumoAguaLitrosDia: number;
  etapaProductiva: string;
}

export const DATOS_PORCICULTURA: DatosPorcicultura[] = [
  { edadSemanas: 1, pesoKg: 2.7, consumoAlimentoKgDia: 0.0, consumoAguaLitrosDia: 0.57, etapaProductiva: 'LACTANCIA' },
  { edadSemanas: 2, pesoKg: 4.4, consumoAlimentoKgDia: 0.014, consumoAguaLitrosDia: 1.5, etapaProductiva: 'LACTANCIA' },
  { edadSemanas: 3, pesoKg: 6.1, consumoAlimentoKgDia: 0.022, consumoAguaLitrosDia: 2.5, etapaProductiva: 'LACTANCIA' },
  { edadSemanas: 4, pesoKg: 7.6, consumoAlimentoKgDia: 0.2, consumoAguaLitrosDia: 5.0, etapaProductiva: 'PRECEBO' },
  { edadSemanas: 5, pesoKg: 9.2, consumoAlimentoKgDia: 0.37, consumoAguaLitrosDia: 5.0, etapaProductiva: 'PRECEBO' },
  { edadSemanas: 6, pesoKg: 12.2, consumoAlimentoKgDia: 0.53, consumoAguaLitrosDia: 6.0, etapaProductiva: 'PRECEBO' },
  { edadSemanas: 7, pesoKg: 15.9, consumoAlimentoKgDia: 0.73, consumoAguaLitrosDia: 6.0, etapaProductiva: 'PRECEBO' },
  { edadSemanas: 8, pesoKg: 20.1, consumoAlimentoKgDia: 0.88, consumoAguaLitrosDia: 6.0, etapaProductiva: 'PRECEBO' },
  { edadSemanas: 9, pesoKg: 24.8, consumoAlimentoKgDia: 1.0, consumoAguaLitrosDia: 7.0, etapaProductiva: 'PRECEBO' },
  { edadSemanas: 10, pesoKg: 30.2, consumoAlimentoKgDia: 1.15, consumoAguaLitrosDia: 7.0, etapaProductiva: 'LEVANTE' },
  { edadSemanas: 11, pesoKg: 35.5, consumoAlimentoKgDia: 1.24, consumoAguaLitrosDia: 7.0, etapaProductiva: 'LEVANTE' },
  { edadSemanas: 12, pesoKg: 41.5, consumoAlimentoKgDia: 1.382, consumoAguaLitrosDia: 8.0, etapaProductiva: 'LEVANTE' },
  { edadSemanas: 13, pesoKg: 47.9, consumoAlimentoKgDia: 1.65, consumoAguaLitrosDia: 9.0, etapaProductiva: 'LEVANTE' },
  { edadSemanas: 14, pesoKg: 54.6, consumoAlimentoKgDia: 1.8, consumoAguaLitrosDia: 10.0, etapaProductiva: 'LEVANTE' },
  { edadSemanas: 15, pesoKg: 61.6, consumoAlimentoKgDia: 2.0, consumoAguaLitrosDia: 11.0, etapaProductiva: 'LEVANTE' },
  { edadSemanas: 16, pesoKg: 68.9, consumoAlimentoKgDia: 2.15, consumoAguaLitrosDia: 12.0, etapaProductiva: 'LEVANTE' },
  { edadSemanas: 17, pesoKg: 76.5, consumoAlimentoKgDia: 2.3, consumoAguaLitrosDia: 13.0, etapaProductiva: 'CEBA' },
  { edadSemanas: 18, pesoKg: 84.2, consumoAlimentoKgDia: 2.4, consumoAguaLitrosDia: 13.0, etapaProductiva: 'CEBA' },
  { edadSemanas: 19, pesoKg: 92.1, consumoAlimentoKgDia: 2.556, consumoAguaLitrosDia: 14.0, etapaProductiva: 'CEBA' },
  { edadSemanas: 20, pesoKg: 100.2, consumoAlimentoKgDia: 2.788, consumoAguaLitrosDia: 14.0, etapaProductiva: 'CEBA' },
  { edadSemanas: 21, pesoKg: 108.4, consumoAlimentoKgDia: 2.911, consumoAguaLitrosDia: 15.0, etapaProductiva: 'CEBA' },
  { edadSemanas: 22, pesoKg: 116.7, consumoAlimentoKgDia: 3.03, consumoAguaLitrosDia: 15.0, etapaProductiva: 'CEBA' },
];

export const PORCICULTURA_CATEGORIAS: Record<
  PorciculturaCategoria,
  { label: string; pesoKg: number; consumoAlimentoKgDia: number; consumoAguaLitrosDia: number }
> = {
  CERDA_VACIA: { label: 'Cerda Vacía', pesoKg: 210, consumoAlimentoKgDia: 2.0, consumoAguaLitrosDia: 12.0 },
  CERDA_GESTANTE: { label: 'Cerda Gestante', pesoKg: 240, consumoAlimentoKgDia: 2.2, consumoAguaLitrosDia: 20.0 },
  CERDA_LACTANTE: { label: 'Cerda Lactante', pesoKg: 210, consumoAlimentoKgDia: 6.0, consumoAguaLitrosDia: 35.0 },
  VERRACO: { label: 'Verraco', pesoKg: 250, consumoAlimentoKgDia: 2.5, consumoAguaLitrosDia: 18.0 },
};
