import { DATOS_POLLO_ENGORDE } from '../data/datosPolloEngorde';
import type { SexoPollo } from '../data/datosPolloEngorde';
import { DATOS_PORCICULTURA, PORCICULTURA_CATEGORIAS } from '../data/datosPorcicultura';
import { DATOS_POSTURA } from '../data/datosPostura';
import type {
  DosageResult,
  PolloEngordeCalculations,
  PolloEngordeInput,
  PolloEngordeProduct,
  PorciculturaCalculations,
  PorciculturaInput,
  PorciculturaProduct,
  PosturaCalculations,
  PosturaInput,
  PosturaProduct,
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

    case 'dosis_por_peso': {
      const Q = (K / 1000) * H;
      N = Q * G;
      formulaTexto = `(Dosis (${K}/1000) x Peso (${H}g)) x ${G} aves = ${fmt(N)}`;
      break;
    }
  }

  const O = N * F;

  return {
    cantidadDiaria: N,
    totalTratamiento: O,
    unidad: product.formaAdministracion === 'Premix' ? 'g' : 'mL',
    formulaTexto,
  };
}

export function getPosturaSuggestionByAge(
  edadSemanas: number,
): { peso: number; alimento: number; agua: number; pesoHuevo: number; porcentajePostura: number } {
  const edad = Math.max(1, Math.min(100, Math.round(edadSemanas)));
  const entry = DATOS_POSTURA.find((d) => d.edad === edad);
  if (entry) {
    return {
      peso: entry.pesoCorporal,
      alimento: entry.consumoAlimento,
      agua: entry.consumoAlimento * 2,
      pesoHuevo: entry.pesoHuevo,
      porcentajePostura: entry.porcentajePostura,
    };
  }
  let closest = DATOS_POSTURA[0];
  for (const d of DATOS_POSTURA) {
    if (d.edad <= edad) closest = d;
    else break;
  }
  return {
    peso: closest.pesoCorporal,
    alimento: closest.consumoAlimento,
    agua: closest.consumoAlimento * 2,
    pesoHuevo: closest.pesoHuevo,
    porcentajePostura: closest.porcentajePostura,
  };
}

export function calculatePostura(input: PosturaInput): PosturaCalculations {
  const numAves = safe(input.numeroAves);
  const consumoAlimentoG = safe(input.consumoAlimentoGramos);
  const consumoAguaMl = consumoAlimentoG * 2;

  const consumoAlimentoDiarioKg = (numAves * consumoAlimentoG) / 1000;
  const consumoAguaDiarioLitros = (numAves * consumoAguaMl) / 1000;

  const sug = getPosturaSuggestionByAge(safe(input.edadSemanas));

  return {
    consumoAguaMlAve: consumoAguaMl,
    consumoAlimentoDiarioKg,
    consumoAguaDiarioLitros,
    totalAves: numAves,
    pesoSugerido: sug.peso,
    consumoAlimentoSugerido: sug.alimento,
    consumoAguaSugerido: sug.agua,
    pesoHuevoSugerido: sug.pesoHuevo,
    porcentajePosturaSugerido: sug.porcentajePostura,
  };
}

export function calculatePosturaDosage(
  product: PosturaProduct,
  context: {
    consumoAlimentoDiarioKg: number;
    consumoAguaDiarioLitros: number;
    diasTratamiento: number;
    pesoGramos: number;
    numeroAves: number;
  },
): DosageResult {
  return calculateDosage(product as unknown as PolloEngordeProduct, context);
}

export function getPorciculturaSuggestionByAge(
  input: { modoEdad: 'semana' | 'categoria'; edadSemanas: number; categoria?: PorciculturaInput['categoria'] },
): { peso: number; alimento: number; agua: number; etapa: string } {
  if (input.modoEdad === 'categoria' && input.categoria) {
    const cat = PORCICULTURA_CATEGORIAS[input.categoria];
    return { peso: cat.pesoKg, alimento: cat.consumoAlimentoKgDia, agua: cat.consumoAguaLitrosDia, etapa: cat.label };
  }

  const edad = Math.max(1, Math.min(22, Math.round(input.edadSemanas)));
  const entry = DATOS_PORCICULTURA.find((d) => d.edadSemanas === edad);
  if (entry) {
    return {
      peso: entry.pesoKg,
      alimento: entry.consumoAlimentoKgDia,
      agua: entry.consumoAguaLitrosDia,
      etapa: entry.etapaProductiva,
    };
  }
  const closest = DATOS_PORCICULTURA[0];
  return { peso: closest.pesoKg, alimento: closest.consumoAlimentoKgDia, agua: closest.consumoAguaLitrosDia, etapa: closest.etapaProductiva };
}

export function calculatePorcicultura(input: PorciculturaInput): PorciculturaCalculations {
  const numCerdos = safe(input.numeroCerdos);
  const consumoAlimentoKgDia = safe(input.consumoAlimentoKgDia);
  const consumoAguaLitrosDia = safe(input.consumoAguaLitrosDia);

  const sug = getPorciculturaSuggestionByAge(input);

  return {
    consumoAlimentoTotalKgDia: numCerdos * consumoAlimentoKgDia,
    consumoAguaTotalLitrosDia: numCerdos * consumoAguaLitrosDia,
    totalCerdos: numCerdos,
    pesoSugerido: sug.peso,
    consumoAlimentoSugerido: sug.alimento,
    consumoAguaSugerido: sug.agua,
    etapaProductiva: sug.etapa,
  };
}

/**
 * Reproduce las fórmulas de la hoja CALCULADORA PORCICULTURA (cols N, O, K, L):
 *   dosis_por_peso_simple:         N = E*G;        O = (N*J)/1000;              K = (O*D)*1000
 *   dosis_por_peso_concentracion:  N = E*G;        O = ((N*J)/conc)/1000;       K = (O*D)*1000
 *   dosis_por_alimento:            N = (E*F)/1000; O = (N*J)/1000;              K = (O*D)*1000
 *   dosis_por_agua:                N = E*H;        O = (N*J)/1000;              K = (O*D)*1000
 *   dosis_unica:                   K = J*E (dosis única, sin multiplicar por días)
 *   dosis_alimento_unica:          N = (E*F)/1000; O = (N*J)/1000000;           K = O (AURORAC)
 * donde E=numCerdos, G=pesoKg, F=consumoAlimentoKgDia, H=consumoAguaLitrosDia, J=dosis, D=diasTratamiento.
 */
export function calculatePorciculturaDosage(
  product: PorciculturaProduct,
  context: {
    numeroCerdos: number;
    pesoKg: number;
    consumoAlimentoKgDia: number;
    consumoAguaLitrosDia: number;
    diasTratamiento: number;
  },
): DosageResult {
  const J = safe(product.dosis);
  const D = safe(context.diasTratamiento);
  const E = safe(context.numeroCerdos);
  const G = safe(context.pesoKg);
  const F = safe(context.consumoAlimentoKgDia);
  const H = safe(context.consumoAguaLitrosDia);
  const conc = safe(product.concentracion ?? 0);

  let K = 0;
  let cantidadDiaria = 0;
  let formulaTexto = '';

  switch (product.tipoCalculo) {
    case 'dosis_por_peso_simple': {
      const N = E * G;
      const O = (N * J) / 1000;
      K = O * D * 1000;
      cantidadDiaria = O * 1000;
      formulaTexto = `(${E} cerdos x ${fmt(G)} kg x Dosis ${J}) / 1000 = ${fmt(cantidadDiaria)} / día`;
      break;
    }

    case 'dosis_por_peso_concentracion': {
      const N = E * G;
      const O = conc > 0 ? (N * J) / conc / 1000 : 0;
      K = O * D * 1000;
      cantidadDiaria = O * 1000;
      formulaTexto = `((${E} cerdos x ${fmt(G)} kg x Dosis ${J}) / Conc. ${conc}) / 1000 = ${fmt(cantidadDiaria)} / día`;
      break;
    }

    case 'dosis_por_alimento': {
      const N = (E * F) / 1000;
      const O = (N * J) / 1000;
      K = O * D * 1000;
      cantidadDiaria = O * 1000;
      formulaTexto = `((${E} cerdos x ${fmt(F)} kg alimento / 1000) x Dosis ${J}) / 1000 = ${fmt(cantidadDiaria)} / día`;
      break;
    }

    case 'dosis_por_agua': {
      const N = E * H;
      const O = (N * J) / 1000;
      K = O * D * 1000;
      cantidadDiaria = O * 1000;
      formulaTexto = `(${E} cerdos x ${fmt(H)} L agua x Dosis ${J}) / 1000 = ${fmt(cantidadDiaria)} / día`;
      break;
    }

    case 'dosis_alimento_unica': {
      const N = (E * F) / 1000;
      const O = (N * J) / 1_000_000;
      K = O;
      cantidadDiaria = O;
      formulaTexto = `(${E} cerdos x ${fmt(F)} kg alimento / 1000) x Dosis ${J} / 1.000.000 = ${fmt(K)} (dosis única)`;
      break;
    }

    case 'dosis_unica': {
      K = J * E;
      cantidadDiaria = K;
      formulaTexto = `Dosis ${J} x ${E} cerdos = ${fmt(K)} (dosis única, no requiere días de tratamiento)`;
      break;
    }
  }

  return {
    cantidadDiaria,
    totalTratamiento: K,
    unidad: product.formaAdministracion === 'Premix' ? 'g' : 'mL',
    formulaTexto,
  };
}

const fmt = (v: number): string => (Number.isInteger(v) ? v.toString() : v.toFixed(2));
