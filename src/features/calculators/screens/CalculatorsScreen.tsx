import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CalculatorCard } from '@features/calculators/components/CalculatorCard';
import { CALCULATOR_OPTIONS } from '@features/calculators/data/options';
import type { CalculatorOption } from '@features/calculators/types';
import { useTheme } from '@theme/index';

export function CalculatorsScreen(): JSX.Element {
  const theme = useTheme();
  const router = useRouter();

  const handlePress = useCallback(
    (option: CalculatorOption) => {
      if (!option.enabled) return;
      router.push(`/calculadoras/${option.id}` as never);
    },
    [router],
  );

  // Agrupar en pares para grid responsivo
  const pairs: CalculatorOption[][] = [];
  for (let i = 0; i < CALCULATOR_OPTIONS.length; i += 2) {
    pairs.push(CALCULATOR_OPTIONS.slice(i, i + 2));
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          Calculadoras de Dosificación e Integridad
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Selecciona el área pecuaria correspondiente a tu cálculo técnico
        </Text>
      </View>

      <View style={styles.grid}>
        {pairs.map((pair, idx) => (
          <View key={idx} style={styles.row}>
            {pair.map((option) => (
              <CalculatorCard key={option.id} option={option} onPress={handlePress} />
            ))}
            {pair.length === 1 ? <View style={styles.spacer} /> : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48,
  },
  hero: {
    marginBottom: 24,
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  grid: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  spacer: {
    flex: 1,
  },
});
