import type { SexoPollo } from '../data/datosPolloEngorde';

export type TipoCalculo =
  | 'agua_directa'
  | 'premix'
  | 'concentracion'
  | 'alimento_directo'
  | 'dosis_por_ave'
  | 'dosis_por_ave_directo';

export interface PolloEngordeProduct {
  id: string;
  nombre: string;
  indicacionUso: string;
  formaAdministracion: 'En agua' | 'Premix';
  diasTratamientoSugeridos: string;
  dosis: number;
  tipoCalculo: TipoCalculo;
  concentracion?: number;
  presentaciones: string[];
  principioActivo: string;
  composicionGarantizada: string;
  indicacionesUso: string;
  dosisTexto: string;
  tiempoRetiro: string;
  precauciones: string;
  contraindicaciones: string;
}

export interface PolloEngordeInput {
  sexo: SexoPollo;
  numeroAves: number;
  edadDias: number;
  pesoGramos: number;
  consumoAlimentoGramos: number;
  diasTratamiento: number;
}

export interface PolloEngordeCalculations {
  consumoAguaMlAve: number;
  consumoAlimentoDiarioKg: number;
  consumoAguaDiarioLitros: number;
  totalAves: number;
  pesoSugerido: number;
  consumoAlimentoSugerido: number;
  consumoAguaSugerido: number;
}

export interface DosageResult {
  cantidadDiaria: number;
  totalTratamiento: number;
  unidad: string;
  formulaTexto: string;
}

export interface CalculatorOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  enabled: boolean;
}
