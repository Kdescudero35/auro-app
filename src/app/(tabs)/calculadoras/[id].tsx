import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PolloEngordeScreen } from '@features/calculators/screens/PolloEngordeScreen';
import { EmptyState } from '@features/shared/components/EmptyState';
import { useTheme } from '@theme/index';

/**
 * Router del módulo de calculadoras.
 * Hoy solo "pollo-engorde" está habilitado; el resto muestra empty-state.
 */
export default function CalculadoraDetalle(): JSX.Element {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  if (id === 'pollo-engorde') {
    return <PolloEngordeScreen />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <EmptyState
        icon="construct-outline"
        title="Módulo en construcción"
        description={`La calculadora "${id}" estará disponible próximamente.`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
