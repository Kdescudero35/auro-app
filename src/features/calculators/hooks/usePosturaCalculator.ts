import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { calculatePostura } from '../utils/calculations';
import {
  type PosturaFormValues,
  posturaSchema,
} from '../utils/schemas';

const DEFAULT_VALUES: PosturaFormValues = {
  numeroAves: undefined,
  edadSemanas: undefined,
  pesoGramos: undefined,
  consumoAlimentoGramos: undefined,
  diasTratamiento: undefined,
};

export function usePosturaCalculator() {
  const form = useForm<PosturaFormValues>({
    resolver: zodResolver(posturaSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control }) as PosturaFormValues;

  const calculations = useMemo(() => calculatePostura({
    numeroAves: values.numeroAves ?? 0,
    edadSemanas: values.edadSemanas ?? 0,
    pesoGramos: values.pesoGramos ?? 0,
    consumoAlimentoGramos: values.consumoAlimentoGramos ?? 0,
    diasTratamiento: values.diasTratamiento ?? 0,
  }), [values]);

  const reset = (): void => form.reset(DEFAULT_VALUES);

  return { form, values, calculations, reset };
}
