import type { SexoPollo } from '../data/datosPolloEngorde';

export type TipoCalculo =
  | 'agua_directa'
  | 'premix'
  | 'concentracion'
  | 'alimento_directo'
  | 'dosis_por_ave'
  | 'dosis_por_ave_directo'
  | 'dosis_por_peso';

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

export interface PosturaProduct {
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

export interface PosturaInput {
  numeroAves: number;
  edadSemanas: number;
  pesoGramos: number;
  consumoAlimentoGramos: number;
  diasTratamiento: number;
}

export interface PosturaCalculations {
  consumoAguaMlAve: number;
  consumoAlimentoDiarioKg: number;
  consumoAguaDiarioLitros: number;
  totalAves: number;
  pesoSugerido: number;
  consumoAlimentoSugerido: number;
  consumoAguaSugerido: number;
  pesoHuevoSugerido: number;
  porcentajePosturaSugerido: number;
}

export type PorciculturaTipoCalculo =
  | 'dosis_por_peso_simple'
  | 'dosis_por_peso_concentracion'
  | 'dosis_por_alimento'
  | 'dosis_por_agua'
  | 'dosis_unica'
  | 'dosis_alimento_unica';

export interface PorciculturaProduct {
  id: string;
  nombre: string;
  indicacionUso: string;
  formaAdministracion: 'En agua' | 'Premix' | 'Inyectable/Oral';
  diasTratamientoSugeridos: string;
  dosis: number;
  tipoCalculo: PorciculturaTipoCalculo;
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

export type PorciculturaModoEdad = 'semana' | 'categoria';

export type PorciculturaCategoria =
  | 'CERDA_VACIA'
  | 'CERDA_GESTANTE'
  | 'CERDA_LACTANTE'
  | 'VERRACO';

export interface PorciculturaInput {
  modoEdad: PorciculturaModoEdad;
  numeroCerdos: number;
  edadSemanas: number;
  categoria?: PorciculturaCategoria;
  pesoKg: number;
  consumoAlimentoKgDia: number;
  consumoAguaLitrosDia: number;
  diasTratamiento: number;
}

export interface PorciculturaCalculations {
  consumoAlimentoTotalKgDia: number;
  consumoAguaTotalLitrosDia: number;
  totalCerdos: number;
  pesoSugerido: number;
  consumoAlimentoSugerido: number;
  consumoAguaSugerido: number;
  etapaProductiva: string;
}

export type BovinoTipoCalculo =
  | 'dosis_por_peso'
  | 'dosis_por_consumo_ms'
  | 'dosis_por_agua'
  | 'dosis_fija_x4'
  | 'dosis_unica'
  | 'dosis_premix_sin_consumo';

export type BovinoEtapa = 'Ternero' | 'Levante' | 'Ceba' | 'Horro' | 'Vaca leche';

export interface BovinoProduct {
  id: string;
  nombre: string;
  formaAdministracion: 'En agua' | 'Premix' | 'Inyectable/Oral';
  diasTratamientoSugeridos: string;
  dosis: number;
  tipoCalculo: BovinoTipoCalculo;
  presentaciones: string[];
  principioActivo: string;
  composicionGarantizada: string;
  indicacionesUso: string;
  dosisTexto: string;
  tiempoRetiro: string;
  precauciones: string;
  contraindicaciones: string;
}

export interface BovinoInput {
  etapa: BovinoEtapa;
  numeroBovinos: number;
  pesoPromedioKg: number;
  diasTratamiento: number;
}

export interface BovinoCalculations {
  consumoMsSugeridoKgDia: number;
  consumoAguaSugeridoLitrosDia: number;
  totalBovinos: number;
}

export type AcuiculturaTipoCalculo =
  | 'dosis_por_alimento'
  | 'dosis_por_agua_tabletas'
  | 'dosis_por_agua_especie'
  | 'dosis_por_pez'
  | 'dosis_por_agua_superficie';

export type AcuiculturaEspecie =
  | 'TILAPIA'
  | 'COBIA'
  | 'TRUCHA'
  | 'CACHAMA'
  | 'SALMON'
  | 'CAMARON'
  | 'BAGRE';

export interface AcuiculturaProduct {
  id: string;
  nombre: string;
  formaAdministracion: 'En agua' | 'Premix' | 'Inyectable/Oral';
  diasTratamientoSugeridos: string;
  dosis: number;
  tipoCalculo: AcuiculturaTipoCalculo;
  presentaciones: string[];
  principioActivo: string;
  composicionGarantizada: string;
  indicacionesUso: string;
  dosisTexto: string;
  tiempoRetiro: string;
  precauciones: string;
  contraindicaciones: string;
}

export interface AcuiculturaInput {
  biomasaKg: number;
  porcentajeConsumoDia: number;
  volumenAguaTon: number;
  numeroPeces: number;
  diasTratamiento: number;
}

export interface AcuiculturaCalculations {
  consumoAlimentoKgDia: number;
  totalPeces: number;
}

export interface CalculatorOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  enabled: boolean;
}
