import { z } from 'zod';

const positiveInt = (label: string) =>
  z
    .number({ invalid_type_error: `${label} debe ser numérico` })
    .int(`${label} debe ser un número entero`)
    .min(1, `${label} debe ser mayor a 0`);

const positiveNumber = (label: string) =>
  z
    .number({ invalid_type_error: `${label} debe ser numérico` })
    .min(0.01, `${label} debe ser mayor a 0`);

export const polloEngordeSchema = z.object({
  sexo: z.enum(['HEMBRA', 'MACHO', 'MIXTO']),
  numeroAves: positiveInt('Número de aves').max(1_000_000, 'Valor demasiado alto').optional(),
  edadDias: positiveInt('Edad').max(56, 'La edad máxima es 56 días').optional(),
  pesoGramos: positiveNumber('Peso').max(10_000, 'Valor demasiado alto').optional(),
  consumoAlimentoGramos: positiveNumber('Consumo de alimento').max(1_000, 'Valor demasiado alto').optional(),
  diasTratamiento: positiveInt('Días de tratamiento').max(42, 'Máximo 42 días').optional(),
});

export type PolloEngordeFormValues = z.infer<typeof polloEngordeSchema>;

export const posturaSchema = z.object({
  numeroAves: positiveInt('Número de aves').max(1_000_000, 'Valor demasiado alto').optional(),
  edadSemanas: positiveInt('Edad').max(100, 'La edad máxima es 100 semanas').optional(),
  pesoGramos: positiveNumber('Peso').max(10_000, 'Valor demasiado alto').optional(),
  consumoAlimentoGramos: positiveNumber('Consumo de alimento').max(1_000, 'Valor demasiado alto').optional(),
  diasTratamiento: positiveInt('Días de tratamiento').max(700, 'Máximo 700 días').optional(),
});

export type PosturaFormValues = z.infer<typeof posturaSchema>;

export const porciculturaSchema = z.object({
  modoEdad: z.enum(['semana', 'categoria']),
  numeroCerdos: positiveInt('Número de cerdos').max(1_000_000, 'Valor demasiado alto').optional(),
  edadSemanas: positiveInt('Edad').max(22, 'La edad máxima es 22 semanas').optional(),
  categoria: z.enum(['CERDA_VACIA', 'CERDA_GESTANTE', 'CERDA_LACTANTE', 'VERRACO']).optional(),
  pesoKg: positiveNumber('Peso').max(500, 'Valor demasiado alto').optional(),
  consumoAlimentoKgDia: positiveNumber('Consumo de alimento').max(50, 'Valor demasiado alto').optional(),
  consumoAguaLitrosDia: positiveNumber('Consumo de agua').max(100, 'Valor demasiado alto').optional(),
  diasTratamiento: positiveInt('Días de tratamiento').max(700, 'Máximo 700 días').optional(),
});

export type PorciculturaFormValues = z.infer<typeof porciculturaSchema>;

export const bovinoSchema = z.object({
  etapa: z.enum(['Ternero', 'Levante', 'Ceba', 'Horro', 'Vaca leche']),
  numeroBovinos: positiveInt('Número de bovinos').max(1_000_000, 'Valor demasiado alto').optional(),
  pesoPromedioKg: positiveNumber('Peso').max(1_500, 'Valor demasiado alto').optional(),
  diasTratamiento: positiveInt('Días de tratamiento').max(700, 'Máximo 700 días').optional(),
});

export type BovinoFormValues = z.infer<typeof bovinoSchema>;

export const acuiculturaSchema = z.object({
  biomasaKg: positiveNumber('Biomasa').max(1_000_000, 'Valor demasiado alto').optional(),
  porcentajeConsumoDia: positiveNumber('% Consumo/día').max(100, 'Máximo 100%').optional(),
  volumenAguaTon: positiveNumber('Volumen de agua').max(100_000, 'Valor demasiado alto').optional(),
  numeroPeces: positiveInt('Número de peces').max(10_000_000, 'Valor demasiado alto').optional(),
  diasTratamiento: positiveInt('Días de tratamiento').max(700, 'Máximo 700 días').optional(),
});

export type AcuiculturaFormValues = z.infer<typeof acuiculturaSchema>;

export const bioseguridadSchema = z.object({
  tipoProduccion: z.enum(['G. Porcícola', 'G. Postura', 'G. Pollo']),
  metrosCuadrados: positiveNumber('Metros cuadrados').max(1_000_000, 'Valor demasiado alto').optional(),
});

export type BioseguridadFormValues = z.infer<typeof bioseguridadSchema>;

export const quotationClientSchema = z.object({
  clientName: z
    .string()
    .min(2, 'Ingresa el nombre del cliente')
    .max(120, 'Nombre demasiado largo'),
  farmName: z.string().min(2, 'Ingresa el nombre de la finca').max(120, 'Demasiado largo'),
  vendorName: z.string().min(2, 'Ingresa el vendedor').max(120, 'Demasiado largo'),
});

export type QuotationClientFormValues = z.infer<typeof quotationClientSchema>;
