import { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { PolloEngordeCalculations } from '@features/calculators/types';
import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';
import { formatInteger, formatNumber } from '@utils/format';

interface CalculatedParamsProps {
  data: PolloEngordeCalculations;
}

export function CalculatedParams({ data }: CalculatedParamsProps): JSX.Element {
  const theme = useTheme();

  return (
    <Card>
      <SectionTitle title="Parámetros calculados" />

      <View style={styles.row}>
        <View style={[styles.tile, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.tileLabel, { color: theme.colors.textSecondary }]}>
            Consumo Agua Ave/Día
          </Text>
          <Text style={[styles.tileValue, { color: theme.colors.secondary }]}>
            {formatNumber(data.consumoAguaMlAve)} mL
          </Text>
        </View>

        <View style={[styles.tile, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.tileLabel, { color: theme.colors.textSecondary }]}>
            Total Aves
          </Text>
          <Text style={[styles.tileValue, { color: theme.colors.textPrimary }]}>
            {formatInteger(data.totalAves)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.tile, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.tileLabel, { color: theme.colors.textSecondary }]}>
            Consumo Alimento Diario
          </Text>
          <Text style={[styles.tileValue, { color: theme.colors.primary }]}>
            {formatNumber(data.consumoAlimentoDiarioKg)} kg
          </Text>
        </View>

        <View style={[styles.tile, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.tileLabel, { color: theme.colors.textSecondary }]}>
            Consumo Agua Diario
          </Text>
          <Text style={[styles.tileValue, { color: theme.colors.secondary }]}>
            {formatNumber(data.consumoAguaDiarioLitros)} L
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  tile: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 8,
  },
  tileLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  tileValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
