import { DOLICAL_DOSIS_POR_ESPECIE } from '../data/datosAcuicultura';
import { PARAMETROS_BOVINOS } from '../data/datosBovinos';
import { DATOS_POLLO_ENGORDE } from '../data/datosPolloEngorde';
import type { SexoPollo } from '../data/datosPolloEngorde';
import { DATOS_PORCICULTURA, PORCICULTURA_CATEGORIAS } from '../data/datosPorcicultura';
import { DATOS_POSTURA } from '../data/datosPostura';
import type {
  AcuiculturaCalculations,
  AcuiculturaEspecie,
  AcuiculturaInput,
  AcuiculturaProduct,
  BioseguridadDosageResult,
  BioseguridadProduct,
  BovinoCalculations,
  BovinoInput,
  BovinoProduct,
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

export function calculateBovino(input: BovinoInput): BovinoCalculations {
  const numBovinos = safe(input.numeroBovinos);
  const peso = safe(input.pesoPromedioKg);
  const parametro = PARAMETROS_BOVINOS.find((p) => p.etapa === input.etapa) ?? PARAMETROS_BOVINOS[0];

  return {
    consumoMsSugeridoKgDia: peso * parametro.porcentajeMs,
    consumoAguaSugeridoLitrosDia: peso * parametro.porcentajeAgua,
    totalBovinos: numBovinos,
  };
}

/**
 * Reproduce las fórmulas de la hoja Calculadora Bovinos:
 *   J (producto diario por animal) segun tipoCalculo:
 *     dosis_por_peso:            J = dosis * pesoPromedioKg
 *     dosis_por_consumo_ms:      J = dosis * (consumoMsKgDia / 1000)
 *     dosis_por_agua:            J = dosis * consumoAguaLitrosDia
 *     dosis_fija_x4:             J = dosis * 4
 *     dosis_unica:               J = dosis
 *     dosis_premix_sin_consumo:  J = dosis / 1000
 *   K (total requerido) = J * diasTratamiento * numeroBovinos (igual para los 45 productos)
 */
export function calculateBovinoDosage(
  product: BovinoProduct,
  context: {
    numeroBovinos: number;
    pesoPromedioKg: number;
    consumoMsKgDia: number;
    consumoAguaLitrosDia: number;
    diasTratamiento: number;
  },
): DosageResult {
  const dosis = safe(product.dosis);
  const D = safe(context.diasTratamiento);
  const numBovinos = safe(context.numeroBovinos);
  const peso = safe(context.pesoPromedioKg);
  const consumoMs = safe(context.consumoMsKgDia);
  const consumoAgua = safe(context.consumoAguaLitrosDia);

  let J = 0;
  let formulaTexto = '';

  switch (product.tipoCalculo) {
    case 'dosis_por_peso':
      J = dosis * peso;
      formulaTexto = `Dosis (${dosis}) x Peso (${fmt(peso)} kg) = ${fmt(J)} / animal / día`;
      break;

    case 'dosis_por_consumo_ms':
      J = dosis * (consumoMs / 1000);
      formulaTexto = `Dosis (${dosis}) x (Consumo MS (${fmt(consumoMs)} kg) / 1000) = ${fmt(J)} / animal / día`;
      break;

    case 'dosis_por_agua':
      J = dosis * consumoAgua;
      formulaTexto = `Dosis (${dosis}) x Consumo agua (${fmt(consumoAgua)} L) = ${fmt(J)} / animal / día`;
      break;

    case 'dosis_fija_x4':
      J = dosis * 4;
      formulaTexto = `Dosis (${dosis}) x 4 = ${fmt(J)} / animal (aplicacion intramamaria en los 4 cuartos)`;
      break;

    case 'dosis_unica':
      J = dosis;
      formulaTexto = `Dosis (${dosis}) = ${fmt(J)} / animal (dosis única)`;
      break;

    case 'dosis_premix_sin_consumo':
      J = dosis / 1000;
      formulaTexto = `Dosis (${dosis}) / 1000 = ${fmt(J)} / animal / día`;
      break;
  }

  const K = J * D * numBovinos;

  return {
    cantidadDiaria: J,
    totalTratamiento: K,
    unidad: product.formaAdministracion === 'Premix' ? 'g' : 'mL',
    formulaTexto,
  };
}

export function calculateAcuicultura(input: AcuiculturaInput): AcuiculturaCalculations {
  const biomasa = safe(input.biomasaKg);
  const porcentajeConsumo = safe(input.porcentajeConsumoDia);

  return {
    consumoAlimentoKgDia: biomasa * (porcentajeConsumo / 100),
    totalPeces: safe(input.numeroPeces),
  };
}

/**
 * Reproduce las fórmulas de la hoja Calculadora Piscicultura (col K "Producto/día"):
 *   dosis_por_alimento:         K = biomasaKg * (%consumoDia / 100) * dosis
 *   dosis_por_agua_tabletas:    K = (volumenAguaTon / 10) * dosis
 *   dosis_por_agua_especie:     K = volumenAguaTon * dosisSegunEspecie (DOLICAL, ver datosAcuicultura.ts)
 *   dosis_por_pez:              K = dosis * numeroPeces
 *   dosis_por_agua_superficie:  K = (((volumenAguaTon/1.5) + (4*SQRT(volumenAguaTon/1.5)*1.5)) / 10) * dosis
 * L (total tratamiento) = K * diasTratamiento (igual para los 9 productos)
 *
 * Nota: Q-FLORFEN usa una dosis fija (2.5 g/kg alimento) en vez del VLOOKUP fragil
 * del Excel original (ver docs/analisis-excel-aurogranja.md sección 7.3). SANITAS WP VET
 * usa el volumen de agua propio del producto en vez de la referencia cruzada errónea del Excel.
 */
export function calculateAcuiculturaDosage(
  product: AcuiculturaProduct,
  context: {
    biomasaKg: number;
    porcentajeConsumoDia: number;
    volumenAguaTon: number;
    numeroPeces: number;
    diasTratamiento: number;
    especie?: AcuiculturaEspecie;
  },
): DosageResult {
  const dosis = safe(product.dosis);
  const D = safe(context.diasTratamiento);
  const biomasa = safe(context.biomasaKg);
  const porcentajeConsumo = safe(context.porcentajeConsumoDia);
  const volumenAgua = safe(context.volumenAguaTon);
  const numeroPeces = safe(context.numeroPeces);

  let K = 0;
  let unidad = 'g';
  let formulaTexto = '';

  switch (product.tipoCalculo) {
    case 'dosis_por_alimento':
      K = biomasa * (porcentajeConsumo / 100) * dosis;
      unidad = 'g';
      formulaTexto = `Biomasa (${fmt(biomasa)} kg) x (%Consumo (${porcentajeConsumo}%) / 100) x Dosis (${dosis}) = ${fmt(K)} / día`;
      break;

    case 'dosis_por_agua_tabletas':
      K = (volumenAgua / 10) * dosis;
      unidad = 'tabletas';
      formulaTexto = `(Volumen agua (${fmt(volumenAgua)} ton) / 10) x Dosis (${dosis}) = ${fmt(K)} / día`;
      break;

    case 'dosis_por_agua_especie': {
      const dosisEspecie = context.especie ? safe(DOLICAL_DOSIS_POR_ESPECIE[context.especie] ?? 0) : 0;
      K = volumenAgua * dosisEspecie;
      unidad = 'g';
      formulaTexto = dosisEspecie > 0
        ? `Volumen agua (${fmt(volumenAgua)} ton) x Dosis según especie (${dosisEspecie} mg/L) = ${fmt(K)}`
        : 'Selecciona una especie con dosis definida (Tilapia, Cobia o Trucha)';
      break;
    }

    case 'dosis_por_pez':
      K = dosis * numeroPeces;
      unidad = 'mL';
      formulaTexto = `Dosis (${dosis}) x ${numeroPeces} peces = ${fmt(K)}`;
      break;

    case 'dosis_por_agua_superficie': {
      const base = volumenAgua / 1.5;
      K = ((base + 4 * Math.sqrt(base) * 1.5) / 10) * dosis;
      unidad = 'g';
      formulaTexto = `Superficie estimada del estanque (a partir de ${fmt(volumenAgua)} ton) x Dosis (${dosis}) = ${fmt(K)} / día`;
      break;
    }
  }

  return {
    cantidadDiaria: K,
    totalTratamiento: K * D,
    unidad,
    formulaTexto,
  };
}

const PEDILUVIO_SOLUCION_FIJA_L = 15;

/**
 * Reproduce las fórmulas de la hoja CALCULADORA BIOSEGURIDAD (cols H, I, J):
 *   area_general:    H = (m2 * constanteAplicacion) / factorUso
 *   pediluvio_fijo:  H = 15 L (fijo, no depende de m2 — volumen estándar de un pediluvio)
 *   en ambos casos:  J (producto) = (H * dosisUso) / 1000; I (agua) = H - J
 * No hay columna de "días de tratamiento": el cálculo es para una sola aplicación.
 */
export function calculateBioseguridadDosage(
  product: BioseguridadProduct,
  context: { metrosCuadrados: number },
): BioseguridadDosageResult {
  const m2 = safe(context.metrosCuadrados);
  const dosisUso = safe(product.dosisUso);

  let H = 0;
  let formulaTexto = '';

  if (product.tipoCalculo === 'pediluvio_fijo') {
    H = PEDILUVIO_SOLUCION_FIJA_L;
    formulaTexto = `Volumen fijo de pediluvio (${PEDILUVIO_SOLUCION_FIJA_L} L), no depende del área`;
  } else {
    const K = safe(product.constanteAplicacion ?? 0);
    const L = safe(product.factorUso ?? 1);
    H = L > 0 ? (m2 * K) / L : 0;
    formulaTexto = `(${fmt(m2)} m² x Constante (${K})) / Factor (${L}) = ${fmt(H)} L de solución`;
  }

  const J = (H * dosisUso) / 1000;
  const I = H - J;

  return {
    cantidadSolucionL: H,
    cantidadAguaL: I,
    cantidadProducto: J,
    unidadProducto: product.unidadProducto,
    formulaTexto,
  };
}

const fmt = (v: number): string => (Number.isInteger(v) ? v.toString() : v.toFixed(2));
