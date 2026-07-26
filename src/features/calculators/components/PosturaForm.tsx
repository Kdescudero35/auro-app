import { useCallback, JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { UseFormReturn } from 'react-hook-form';

import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';

import { NumberField } from './NumberField';
import { SuggestionBadge } from './SuggestionBadge';
import type { PosturaFormValues } from '../utils/schemas';

interface PosturaFormProps {
  form: UseFormReturn<PosturaFormValues>;
  pesoSugerido: number;
  consumoAlimentoSugerido: number;
  consumoAguaSugerido: number;
}

export function PosturaForm({
  form,
  pesoSugerido,
  consumoAlimentoSugerido,
}: PosturaFormProps): JSX.Element {
  const applyPesoSugerido = useCallback(() => {
    form.setValue('pesoGramos', pesoSugerido, { shouldValidate: true });
  }, [form, pesoSugerido]);

  const applyAlimentoSugerido = useCallback(() => {
    form.setValue('consumoAlimentoGramos', consumoAlimentoSugerido, { shouldValidate: true });
  }, [form, consumoAlimentoSugerido]);

  return (
    <Card>
      <SectionTitle title="Variables de entrada" />

      <View style={styles.fields}>
        <NumberField control={form.control} name="numeroAves" label="Número de aves" placeholder="Ej: 2000" />
        <NumberField control={form.control} name="edadSemanas" label="Edad del ave (semanas)" placeholder="1 a 100" />

        <NumberField
          control={form.control}
          name="pesoGramos"
          label="Peso corporal del ave (gramos)"
          placeholder="Ej: 1580"
          rightSlot={
            <SuggestionBadge label={`Sugerir: ${pesoSugerido}g`} onPress={applyPesoSugerido} />
          }
        />

        <NumberField
          control={form.control}
          name="consumoAlimentoGramos"
          label="Consumo alimento ave/día (g)"
          placeholder="Ej: 101"
          rightSlot={
            <SuggestionBadge
              label={`Sugerir: ${consumoAlimentoSugerido}g`}
              onPress={applyAlimentoSugerido}
            />
          }
        />

        <NumberField
          control={form.control}
          name="diasTratamiento"
          label="Días de tratamiento"
          placeholder="Ej: 5"
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
