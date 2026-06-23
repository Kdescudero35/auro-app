import { DATOS_POLLO_ENGORDE } from '../data/datosPolloEngorde';
import type { SexoPollo } from '../data/datosPolloEngorde';
import type {
  DosageResult,
  PolloEngordeCalculations,
  PolloEngordeInput,
  PolloEngordeProduct,
} from '../types';

const safe = (v: number): number => (Number.isFinite(v) && !Number.isNaN(v) ? v : 0);

export function getSuggestionByAge(
  edadDias: number,
  sexo: SexoPollo,
): { peso: number; alimento: number; agua: number } {
  const tabla = DATOS_POLLO_ENGORDE[sexo];
  const edad = Math.max(1, Math.min(56, Math.round(edadDias)));
  const entry = tabla.find((d) => d.edad === edad);
  if (entry) return { peso: entry.peso, alimento: entry.consumoAlimento, agua: entry.consumoAgua };
  let closest = tabla[0];
  for (const d of tabla) {
    if (d.edad <= edad) closest = d;
    else break;
  }
  return { peso: closest.peso, alimento: closest.consumoAlimento, agua: closest.consumoAgua };
}

export function calculatePolloEngorde(input: PolloEngordeInput): PolloEngordeCalculations {
  const numAves = safe(input.numeroAves);
  const consumoAlimentoG = safe(input.consumoAlimentoGramos);
  const consumoAguaMl = consumoAlimentoG * 2;

  const consumoAlimentoDiarioKg = (numAves * consumoAlimentoG) / 1000;
  const consumoAguaDiarioLitros = (numAves * consumoAguaMl) / 1000;

  const sug = getSuggestionByAge(safe(input.edadDias), input.sexo);

  return {
    consumoAguaMlAve: consumoAguaMl,
    consumoAlimentoDiarioKg,
    consumoAguaDiarioLitros,
    totalAves: numAves,
    pesoSugerido: sug.peso,
    consumoAlimentoSugerido: sug.alimento,
    consumoAguaSugerido: sug.agua,
  };
}

/**
 * Calcula la dosificación según el tipo de cálculo del producto.
 *
 * Reproduce exactamente las fórmulas del Excel:
 *   agua_directa:          N = M * K           (consumoAguaTotalL * dosis)
 *   premix:                N = (L * K) / 1000  (consumoAlimentoTotalKg * dosis / 1000)
 *   concentracion:         N = Q * G  donde Q = H*(K/1000)/R
 *   alimento_directo:      N = K * L           (dosis * consumoAlimentoTotalKg)
 *   dosis_por_ave:         N = (K * G) / 1000
 *   dosis_por_ave_directo: N = K * G
 *
 * O = N * F (total tratamiento)
 */
export function calculateDosage(
  product: PolloEngordeProduct,
  context: {
    consumoAlimentoDiarioKg: number;
    consumoAguaDiarioLitros: number;
    diasTratamiento: number;
    pesoGramos: number;
    numeroAves: number;
  },
): DosageResult {
  const K = safe(product.dosis);
  const F = safe(context.diasTratamiento);
  const L = safe(context.consumoAlimentoDiarioKg);
  const M = safe(context.consumoAguaDiarioLitros);
  const H = safe(context.pesoGramos);
  const G = safe(context.numeroAves);
  const R = safe(product.concentracion ?? 0);

  let N = 0;
  let formulaTexto = '';

  switch (product.tipoCalculo) {
    case 'agua_directa':
      N = M * K;
      formulaTexto = `Consumo agua total (${fmt(M)} L) x Dosis (${K}) = ${fmt(N)}`;
      break;

    case 'premix':
      N = (L * K) / 1000;
      formulaTexto = `(Consumo alimento total (${fmt(L)} kg) x Dosis (${K})) / 1000 = ${fmt(N)}`;
      break;

    case 'concentracion': {
      const Q = R > 0 ? (H * (K / 1000)) / R : 0;
      N = Q * G;
      formulaTexto = `(Peso (${H}g) x Dosis (${K}/1000) / Conc. (${R})) x ${G} aves = ${fmt(N)}`;
      break;
    }

    case 'alimento_directo':
      N = K * L;
      formulaTexto = `Dosis (${K}) x Consumo alimento total (${fmt(L)} kg) = ${fmt(N)}`;
      break;

    case 'dosis_por_ave':
      N = (K * G) / 1000;
      formulaTexto = `(Dosis (${K}) x ${G} aves) / 1000 = ${fmt(N)}`;
      break;

    case 'dosis_por_ave_directo':
      N = K * G;
      formulaTexto = `Dosis (${K}) x ${G} aves = ${fmt(N)}`;
      break;
  }

  const O = N * F;

  return {
    cantidadDiaria: N,
    totalTratamiento: O,
    unidad: product.formaAdministracion === 'Premix' ? 'g' : 'mL',
    formulaTexto,
  };
}

const fmt = (v: number): string => (Number.isInteger(v) ? v.toString() : v.toFixed(2));
