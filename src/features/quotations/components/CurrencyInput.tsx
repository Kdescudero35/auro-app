import { JSX } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useTheme } from '@theme/index';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function CurrencyInput({ value, onChange }: CurrencyInputProps): JSX.Element {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.pill,
        },
      ]}
    >
      <Text style={[styles.prefix, { color: theme.colors.textSecondary }]}>$</Text>
      <TextInput
        value={value === 0 ? '' : String(value)}
        onChangeText={(text) => {
          if (text === '') {
            onChange(0);
            return;
          }
          const sanitized = text.replace(/[^0-9]/g, '');
          onChange(Number(sanitized) || 0);
        }}
        placeholder="0"
        placeholderTextColor={theme.colors.textMuted}
        keyboardType="numeric"
        inputMode="numeric"
        style={[
          styles.input,
          {
            color: theme.colors.textPrimary,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
    gap: 6,
  },
  prefix: {
    fontWeight: '700',
  },
  input: {
    flex: 1,
    fontWeight: '700',
    textAlign: 'right',
    paddingVertical: 0,
  },
});
