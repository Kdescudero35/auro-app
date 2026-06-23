import { JSX } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { useQuotationForm } from '@features/quotations/hooks/useQuotationForm';
import { Input } from '@features/shared/components/Input';

export function QuotationClientForm(): JSX.Element {
  const { form } = useQuotationForm();

  return (
    <View style={styles.container}>
      <Controller
        control={form.control}
        name="clientName"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            label="Nombre del cliente"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Ej: Ganadería Gómez S.A.S"
            error={error?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={form.control}
        name="farmName"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            label="Nombre de la finca"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Ej: Hacienda La Pradera"
            error={error?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={form.control}
        name="vendorName"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <Input
            label="Vendedor asesor"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Asesor Aurofarma"
            error={error?.message}
            autoCapitalize="words"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
});
