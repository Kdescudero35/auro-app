import { JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UseFormReturn } from 'react-hook-form';

import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';

import { NumberField } from './NumberField';
import type { BovinoEtapa } from '../types';
import type { BovinoFormValues } from '../utils/schemas';

interface BovinoFormProps {
  form: UseFormReturn<BovinoFormValues>;
}

const ETAPA_OPTIONS: { value: BovinoEtapa; label: string }[] = [
  { value: 'Ternero', label: 'Ternero' },
  { value: 'Levante', label: 'Levante' },
  { value: 'Ceba', label: 'Ceba' },
  { value: 'Horro', label: 'Horro' },
  { value: 'Vaca leche', label: 'Vaca leche' },
];

export function BovinoForm({ form }: BovinoFormProps): JSX.Element {
  const theme = useTheme();
  const etapa = form.watch('etapa');

  return (
    <Card>
      <SectionTitle title="Variables de entrada" />

      <View style={styles.fields}>
        <View style={styles.pillContainer}>
          <Text style={[styles.pillLabel, { color: theme.colors.textSecondary }]}>Etapa productiva</Text>
          <View style={styles.pillRow}>
            {ETAPA_OPTIONS.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => form.setValue('etapa', opt.value, { shouldValidate: true })}
                style={[
                  styles.pillButton,
                  {
                    backgroundColor: etapa === opt.value ? theme.colors.primary : theme.colors.background,
                    borderColor: etapa === opt.value ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    { color: etapa === opt.value ? '#fff' : theme.colors.textPrimary },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <NumberField control={form.control} name="numeroBovinos" label="Número de bovinos" placeholder="Ej: 50" />

        <NumberField
          control={form.control}
          name="pesoPromedioKg"
          label="Peso promedio del bovino (kg)"
          placeholder="Ej: 350"
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
});
