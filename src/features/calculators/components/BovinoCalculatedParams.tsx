import { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { BovinoCalculations } from '@features/calculators/types';
import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';
import { formatInteger, formatNumber } from '@utils/format';

interface BovinoCalculatedParamsProps {
  data: BovinoCalculations;
}

export function BovinoCalculatedParams({ data }: BovinoCalculatedParamsProps): JSX.Element {
  const theme = useTheme();

  return (
    <Card>
      <SectionTitle title="Parámetros calculados" />

      <View style={styles.row}>
        <View style={[styles.tile, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.tileLabel, { color: theme.colors.textSecondary }]}>
            Total Bovinos
          </Text>
          <Text style={[styles.tileValue, { color: theme.colors.textPrimary }]}>
            {formatInteger(data.totalBovinos)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.tile, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.tileLabel, { color: theme.colors.textSecondary }]}>
            Consumo MS Sugerido
          </Text>
          <Text style={[styles.tileValue, { color: theme.colors.primary }]}>
            {formatNumber(data.consumoMsSugeridoKgDia)} kg/día
          </Text>
        </View>

        <View style={[styles.tile, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.tileLabel, { color: theme.colors.textSecondary }]}>
            Consumo Agua Sugerido
          </Text>
          <Text style={[styles.tileValue, { color: theme.colors.secondary }]}>
            {formatNumber(data.consumoAguaSugeridoLitrosDia)} L/día
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
