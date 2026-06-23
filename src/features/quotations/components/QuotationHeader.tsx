import { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@theme/index';
import { formatCurrency } from '@utils/format';

interface QuotationHeaderProps {
  total: number;
}

export function QuotationHeader({ total }: QuotationHeaderProps): JSX.Element {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Presupuesto y Cotización Pecuaria
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Ingresa los datos del cliente para formalizar e imprimir el presupuesto
        </Text>
      </View>

      <View
        style={[
          styles.totalBox,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <Text style={styles.totalLabel}>TOTAL COTIZADO</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  text: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  totalBox: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 4,
    minWidth: 140,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
