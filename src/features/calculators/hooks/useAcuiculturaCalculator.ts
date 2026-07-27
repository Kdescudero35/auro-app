import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { calculateAcuicultura } from '../utils/calculations';
import {
  type AcuiculturaFormValues,
  acuiculturaSchema,
} from '../utils/schemas';

const DEFAULT_VALUES: AcuiculturaFormValues = {
  biomasaKg: undefined,
  porcentajeConsumoDia: undefined,
  volumenAguaTon: undefined,
  numeroPeces: undefined,
  diasTratamiento: undefined,
};

export function useAcuiculturaCalculator() {
  const form = useForm<AcuiculturaFormValues>({
    resolver: zodResolver(acuiculturaSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control }) as AcuiculturaFormValues;

  const calculations = useMemo(() => calculateAcuicultura({
    biomasaKg: values.biomasaKg ?? 0,
    porcentajeConsumoDia: values.porcentajeConsumoDia ?? 0,
    volumenAguaTon: values.volumenAguaTon ?? 0,
    numeroPeces: values.numeroPeces ?? 0,
    diasTratamiento: values.diasTratamiento ?? 0,
  }), [values]);

  const reset = (): void => form.reset(DEFAULT_VALUES);

  return { form, values, calculations, reset };
}
