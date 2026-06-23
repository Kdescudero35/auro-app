import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { calculatePolloEngorde } from '../utils/calculations';
import {
  type PolloEngordeFormValues,
  polloEngordeSchema,
} from '../utils/schemas';

const DEFAULT_VALUES: PolloEngordeFormValues = {
  sexo: 'MIXTO',
  numeroAves: undefined,
  edadDias: undefined,
  pesoGramos: undefined,
  consumoAlimentoGramos: undefined,
  diasTratamiento: undefined,
};

export function usePolloEngordeCalculator() {
  const form = useForm<PolloEngordeFormValues>({
    resolver: zodResolver(polloEngordeSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control }) as PolloEngordeFormValues;

  const calculations = useMemo(() => calculatePolloEngorde({
    sexo: values.sexo ?? 'MIXTO',
    numeroAves: values.numeroAves ?? 0,
    edadDias: values.edadDias ?? 0,
    pesoGramos: values.pesoGramos ?? 0,
    consumoAlimentoGramos: values.consumoAlimentoGramos ?? 0,
    diasTratamiento: values.diasTratamiento ?? 0,
  }), [values]);

  const reset = (): void => form.reset(DEFAULT_VALUES);

  return { form, values, calculations, reset };
}
