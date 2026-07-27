import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { UseFormReturn } from 'react-hook-form';

import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';

import { NumberField } from './NumberField';
import type { AcuiculturaFormValues } from '../utils/schemas';

interface AcuiculturaFormProps {
  form: UseFormReturn<AcuiculturaFormValues>;
}

export function AcuiculturaForm({ form }: AcuiculturaFormProps): JSX.Element {
  return (
    <Card>
      <SectionTitle title="Variables de entrada" />

      <View style={styles.fields}>
        <NumberField
          control={form.control}
          name="biomasaKg"
          label="Biomasa del estanque (kg)"
          placeholder="Ej: 900"
        />

        <NumberField
          control={form.control}
          name="porcentajeConsumoDia"
          label="% Consumo de alimento/día"
          placeholder="Ej: 3"
        />

        <NumberField
          control={form.control}
          name="volumenAguaTon"
          label="Volumen de agua (ton)"
          placeholder="Ej: 50"
        />

        <NumberField control={form.control} name="numeroPeces" label="Número de peces" placeholder="Ej: 2000" />

        <NumberField
          control={form.control}
          name="diasTratamiento"
          label="Días de tratamiento"
          placeholder="Ej: 7"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 16,
  },
});
