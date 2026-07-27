import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { calculatePorcicultura } from '../utils/calculations';
import {
  type PorciculturaFormValues,
  porciculturaSchema,
} from '../utils/schemas';

const DEFAULT_VALUES: PorciculturaFormValues = {
  modoEdad: 'semana',
  numeroCerdos: undefined,
  edadSemanas: undefined,
  categoria: undefined,
  pesoKg: undefined,
  consumoAlimentoKgDia: undefined,
  consumoAguaLitrosDia: undefined,
  diasTratamiento: undefined,
};

export function usePorciculturaCalculator() {
  const form = useForm<PorciculturaFormValues>({
    resolver: zodResolver(porciculturaSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control }) as PorciculturaFormValues;

  const calculations = useMemo(() => calculatePorcicultura({
    modoEdad: values.modoEdad ?? 'semana',
    numeroCerdos: values.numeroCerdos ?? 0,
    edadSemanas: values.edadSemanas ?? 0,
    categoria: values.categoria,
    pesoKg: values.pesoKg ?? 0,
    consumoAlimentoKgDia: values.consumoAlimentoKgDia ?? 0,
    consumoAguaLitrosDia: values.consumoAguaLitrosDia ?? 0,
    diasTratamiento: values.diasTratamiento ?? 0,
  }), [values]);

  const reset = (): void => form.reset(DEFAULT_VALUES);

  return { form, values, calculations, reset };
}
