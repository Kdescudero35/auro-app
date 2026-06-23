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

export const quotationClientSchema = z.object({
  clientName: z
    .string()
    .min(2, 'Ingresa el nombre del cliente')
    .max(120, 'Nombre demasiado largo'),
  farmName: z.string().min(2, 'Ingresa el nombre de la finca').max(120, 'Demasiado largo'),
  vendorName: z.string().min(2, 'Ingresa el vendedor').max(120, 'Demasiado largo'),
});

export type QuotationClientFormValues = z.infer<typeof quotationClientSchema>;
