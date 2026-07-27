import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import {
  type BioseguridadFormValues,
  bioseguridadSchema,
} from '../utils/schemas';

const DEFAULT_VALUES: BioseguridadFormValues = {
  tipoProduccion: 'G. Porcícola',
  metrosCuadrados: undefined,
};

export function useBioseguridadCalculator() {
  const form = useForm<BioseguridadFormValues>({
    resolver: zodResolver(bioseguridadSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const values = useWatch({ control: form.control }) as BioseguridadFormValues;

  const reset = (): void => form.reset(DEFAULT_VALUES);

  return { form, values, reset };
}
