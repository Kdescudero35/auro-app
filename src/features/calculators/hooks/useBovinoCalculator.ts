import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { calculateBovino } from '../utils/calculations';
import {
  type BovinoFormValues,
  bovinoSchema,
} from '../utils/schemas';

const DEFAULT_VALUES: BovinoFormValues = {
  etapa: 'Ceba',
  numeroBovinos: undefined,
  pesoPromedioKg: undefined,
  diasTratamiento: undefined,
};

export function useBovinoCalculator() {
  const form = useForm<BovinoFormValues>({
    resolver: zodResolver(bovinoSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control }) as BovinoFormValues;

  const calculations = useMemo(() => calculateBovino({
    etapa: values.etapa ?? 'Ceba',
    numeroBovinos: values.numeroBovinos ?? 0,
    pesoPromedioKg: values.pesoPromedioKg ?? 0,
    diasTratamiento: values.diasTratamiento ?? 0,
  }), [values]);

  const reset = (): void => form.reset(DEFAULT_VALUES);

  return { form, values, calculations, reset };
}
