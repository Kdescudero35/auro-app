import { useCallback, JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UseFormReturn } from 'react-hook-form';

import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';

import { NumberField } from './NumberField';
import { SuggestionBadge } from './SuggestionBadge';
import { PORCICULTURA_CATEGORIAS } from '../data/datosPorcicultura';
import type { PorciculturaCategoria, PorciculturaModoEdad } from '../types';
import type { PorciculturaFormValues } from '../utils/schemas';

interface PorciculturaFormProps {
  form: UseFormReturn<PorciculturaFormValues>;
  pesoSugerido: number;
  consumoAlimentoSugerido: number;
  consumoAguaSugerido: number;
  etapaProductiva: string;
}

const MODO_OPTIONS: { value: PorciculturaModoEdad; label: string }[] = [
  { value: 'semana', label: 'Por semana' },
  { value: 'categoria', label: 'Por categoría' },
];

const CATEGORIA_OPTIONS: { value: PorciculturaCategoria; label: string }[] = (
  Object.keys(PORCICULTURA_CATEGORIAS) as PorciculturaCategoria[]
).map((value) => ({ value, label: PORCICULTURA_CATEGORIAS[value].label }));

export function PorciculturaForm({
  form,
  pesoSugerido,
  consumoAlimentoSugerido,
  consumoAguaSugerido,
  etapaProductiva,
}: PorciculturaFormProps): JSX.Element {
  const theme = useTheme();
  const modoEdad = form.watch('modoEdad');
  const categoria = form.watch('categoria');

  const applyPesoSugerido = useCallback(() => {
    form.setValue('pesoKg', pesoSugerido, { shouldValidate: true });
  }, [form, pesoSugerido]);

  const applyAlimentoSugerido = useCallback(() => {
    form.setValue('consumoAlimentoKgDia', consumoAlimentoSugerido, { shouldValidate: true });
  }, [form, consumoAlimentoSugerido]);

  const applyAguaSugerido = useCallback(() => {
    form.setValue('consumoAguaLitrosDia', consumoAguaSugerido, { shouldValidate: true });
  }, [form, consumoAguaSugerido]);

  return (
    <Card>
      <SectionTitle title="Variables de entrada" />

      <View style={styles.fields}>
        <View style={styles.pillContainer}>
          <Text style={[styles.pillLabel, { color: theme.colors.textSecondary }]}>Modo de edad</Text>
          <View style={styles.pillRow}>
            {MODO_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => form.setValue('modoEdad', opt.value, { shouldValidate: true })}
                style={[
                  styles.pillButton,
                  {
                    backgroundColor: modoEdad === opt.value ? theme.colors.primary : theme.colors.background,
                    borderColor: modoEdad === opt.value ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    { color: modoEdad === opt.value ? '#fff' : theme.colors.textPrimary },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {modoEdad === 'categoria' ? (
          <View style={styles.pillContainer}>
            <Text style={[styles.pillLabel, { color: theme.colors.textSecondary }]}>Categoría</Text>
            <View style={styles.pillRow}>
              {CATEGORIA_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => form.setValue('categoria', opt.value, { shouldValidate: true })}
                  style={[
                    styles.pillButton,
                    {
                      backgroundColor: categoria === opt.value ? theme.colors.primary : theme.colors.background,
                      borderColor: categoria === opt.value ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.pillButtonText,
                      { color: categoria === opt.value ? '#fff' : theme.colors.textPrimary },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <NumberField
            control={form.control}
            name="edadSemanas"
            label="Edad (semanas)"
            placeholder="1 a 22"
          />
        )}

        <NumberField control={form.control} name="numeroCerdos" label="Número de cerdos" placeholder="Ej: 500" />

        <NumberField
          control={form.control}
          name="pesoKg"
          label="Peso corporal del cerdo (kg)"
          placeholder="Ej: 20"
          rightSlot={<SuggestionBadge label={`Sugerir: ${pesoSugerido} kg`} onPress={applyPesoSugerido} />}
        />

        <NumberField
          control={form.control}
          name="consumoAlimentoKgDia"
          label="Consumo alimento cerdo/día (kg)"
          placeholder="Ej: 0.88"
          rightSlot={
            <SuggestionBadge label={`Sugerir: ${consumoAlimentoSugerido} kg`} onPress={applyAlimentoSugerido} />
          }
        />

        <NumberField
          control={form.control}
          name="consumoAguaLitrosDia"
          label="Consumo agua cerdo/día (L)"
          placeholder="Ej: 6"
          rightSlot={<SuggestionBadge label={`Sugerir: ${consumoAguaSugerido} L`} onPress={applyAguaSugerido} />}
        />

        <NumberField
          control={form.control}
          name="diasTratamiento"
          label="Días de tratamiento"
          placeholder="Ej: 5"
        />

        {etapaProductiva ? (
          <Text style={[styles.etapaText, { color: theme.colors.textMuted }]}>
            Etapa productiva: {etapaProductiva}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 16,
  },
  pillContainer: {
    gap: 8,
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pillButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  etapaText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});
