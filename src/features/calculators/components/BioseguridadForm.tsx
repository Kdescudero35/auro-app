import { JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UseFormReturn } from 'react-hook-form';

import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';

import { NumberField } from './NumberField';
import { BIOSEGURIDAD_TIPOS_PRODUCCION } from '../data/datosBioseguridad';
import type { BioseguridadFormValues } from '../utils/schemas';

interface BioseguridadFormProps {
  form: UseFormReturn<BioseguridadFormValues>;
}

export function BioseguridadForm({ form }: BioseguridadFormProps): JSX.Element {
  const theme = useTheme();
  const tipoProduccion = form.watch('tipoProduccion');

  return (
    <Card>
      <SectionTitle title="Variables de entrada" />

      <View style={styles.fields}>
        <View style={styles.pillContainer}>
          <Text style={[styles.pillLabel, { color: theme.colors.textSecondary }]}>Tipo de producción</Text>
          <View style={styles.pillRow}>
            {BIOSEGURIDAD_TIPOS_PRODUCCION.map((opt) => (
              <Pressable
                key={opt.value}
                onPress={() => form.setValue('tipoProduccion', opt.value, { shouldValidate: true })}
                style={[
                  styles.pillButton,
                  {
                    backgroundColor: tipoProduccion === opt.value ? theme.colors.primary : theme.colors.background,
                    borderColor: tipoProduccion === opt.value ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    { color: tipoProduccion === opt.value ? '#fff' : theme.colors.textPrimary },
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <NumberField
          control={form.control}
          name="metrosCuadrados"
          label="Área a tratar (m²)"
          placeholder="Ej: 1000"
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
