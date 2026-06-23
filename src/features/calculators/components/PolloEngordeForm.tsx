import { useCallback, JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UseFormReturn } from 'react-hook-form';

import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';

import { NumberField } from './NumberField';
import { SuggestionBadge } from './SuggestionBadge';
import type { PolloEngordeFormValues } from '../utils/schemas';
import type { SexoPollo } from '../data/datosPolloEngorde';

interface PolloEngordeFormProps {
  form: UseFormReturn<PolloEngordeFormValues>;
  pesoSugerido: number;
  consumoAlimentoSugerido: number;
  consumoAguaSugerido: number;
}

const SEXO_OPTIONS: { value: SexoPollo; label: string }[] = [
  { value: 'HEMBRA', label: 'Hembra' },
  { value: 'MACHO', label: 'Macho' },
  { value: 'MIXTO', label: 'Mixto' },
];

export function PolloEngordeForm({
  form,
  pesoSugerido,
  consumoAlimentoSugerido,
}: PolloEngordeFormProps): JSX.Element {
  const theme = useTheme();
  const sexo = form.watch('sexo');

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
        <View style={styles.sexoContainer}>
          <Text style={[styles.sexoLabel, { color: theme.colors.textSecondary }]}>Sexo</Text>
          <View style={styles.sexoRow}>
            {SEXO_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => form.setValue('sexo', opt.value, { shouldValidate: true })}
                style={[
                  styles.sexoButton,
                  {
                    backgroundColor:
                      sexo === opt.value ? theme.colors.primary : theme.colors.background,
                    borderColor: sexo === opt.value ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sexoButtonText,
                    {
                      color:
                        sexo === opt.value ? '#fff' : theme.colors.textPrimary,
                    },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <NumberField control={form.control} name="numeroAves" label="Número de aves" placeholder="Ej: 50000" />
        <NumberField control={form.control} name="edadDias" label="Edad del pollo (días)" placeholder="1 a 56" />

        <NumberField
          control={form.control}
          name="pesoGramos"
          label="Peso del ave (gramos)"
          placeholder="Ej: 317"
          rightSlot={
            <SuggestionBadge label={`Sugerir: ${pesoSugerido}g`} onPress={applyPesoSugerido} />
          }
        />

        <NumberField
          control={form.control}
          name="consumoAlimentoGramos"
          label="Consumo alimento ave/día (g)"
          placeholder="Ej: 47"
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
  sexoContainer: {
    gap: 8,
  },
  sexoLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  sexoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sexoButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  sexoButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
