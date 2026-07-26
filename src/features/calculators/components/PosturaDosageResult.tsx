import { Ionicons } from '@expo/vector-icons';
import { useMemo, JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { calculatePosturaDosage } from '@features/calculators/utils/calculations';
import type { PosturaProduct } from '@features/calculators/types';
import { Button } from '@features/shared/components/Button';
import { useQuotationStore } from '@store/quotationStore';
import { useTheme } from '@theme/index';
import { formatNumber } from '@utils/format';

interface PosturaDosageResultProps {
  product: PosturaProduct;
  consumoAlimentoDiarioKg: number;
  consumoAguaDiarioLitros: number;
  diasTratamiento: number;
  pesoGramos: number;
  numeroAves: number;
}

export function PosturaDosageResult({
  product,
  consumoAlimentoDiarioKg,
  consumoAguaDiarioLitros,
  diasTratamiento,
  pesoGramos,
  numeroAves,
}: PosturaDosageResultProps): JSX.Element {
  const theme = useTheme();
  const addItem = useQuotationStore((s) => s.addItem);

  const dosage = useMemo(
    () =>
      calculatePosturaDosage(product, {
        consumoAlimentoDiarioKg,
        consumoAguaDiarioLitros,
        diasTratamiento,
        pesoGramos,
        numeroAves,
      }),
    [product, consumoAlimentoDiarioKg, consumoAguaDiarioLitros, diasTratamiento, pesoGramos, numeroAves],
  );

  const handleAdd = (): void => {
    addItem({
      producto: product.nombre,
      productoId: product.id,
      especialidad: 'Gallina De Postura',
      categoria: 'gallina-postura',
      cantidadRequerida: Math.round(dosage.totalTratamiento),
      cantidadUnidad: dosage.unidad,
      presentacion: product.presentaciones[0] ?? '',
      presentacionesDisponibles: product.presentaciones,
      precioUnitario: 0,
      principioActivo: product.principioActivo,
      formaAdministracion: product.formaAdministracion,
      tiempoRetiro: product.tiempoRetiro,
    });

    Toast.show({
      type: 'success',
      text1: 'Agregado a la cotización',
      text2: `${product.nombre} · ${formatNumber(dosage.totalTratamiento)} ${dosage.unidad}`,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surfaceElevated,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headerTitle, { color: theme.colors.primary }]}>
              {product.nombre}
            </Text>
            <Text style={[styles.principio, { color: theme.colors.textSecondary }]}>
              {product.principioActivo}
            </Text>
            <Text style={[styles.meta, { color: theme.colors.textMuted }]}>
              {product.formaAdministracion} · {product.indicacionUso}
            </Text>
          </View>
        </View>

        <Button label="Agregar" icon="add" onPress={handleAdd} size="sm" />
      </View>

      <View style={styles.resultsRow}>
        <View
          style={[
            styles.resultBox,
            { backgroundColor: theme.colors.background, borderRadius: theme.radius.md },
          ]}
        >
          <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>
            Cantidad Diaria
          </Text>
          <Text style={[styles.resultValue, { color: theme.colors.secondary }]}>
            {formatNumber(dosage.cantidadDiaria)} {dosage.unidad}
          </Text>
        </View>

        <View
          style={[
            styles.resultBox,
            { backgroundColor: theme.colors.background, borderRadius: theme.radius.md },
          ]}
        >
          <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>
            Total Tratamiento
          </Text>
          <Text style={[styles.resultValue, { color: theme.colors.primary }]}>
            {formatNumber(dosage.totalTratamiento)} {dosage.unidad}
          </Text>
        </View>
      </View>

      <Text style={[styles.formula, { color: theme.colors.textMuted }]}>
        {dosage.formulaTexto}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.metaColumn}>
          <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
            Tiempo de retiro
          </Text>
          <Text style={[styles.metaValue, { color: theme.colors.danger }]}>
            {product.tiempoRetiro}
          </Text>
        </View>
        <View style={styles.metaColumn}>
          <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
            Presentaciones
          </Text>
          <Text style={[styles.metaValue, { color: theme.colors.textPrimary }]}>
            {product.presentaciones.join(', ')}
          </Text>
        </View>
      </View>

      <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>
        Días sugeridos: {product.diasTratamientoSugeridos}
      </Text>

      <View style={styles.footnote}>
        <Ionicons name="information-circle" size={14} color={theme.colors.textMuted} />
        <Text style={[styles.footnoteText, { color: theme.colors.textMuted }]}>
          Los cálculos se actualizan en tiempo real con las variables de entrada.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 16,
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  principio: {
    fontSize: 13,
    marginTop: 2,
  },
  meta: {
    fontSize: 11,
    marginTop: 2,
  },
  resultsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  resultBox: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  formula: {
    fontSize: 11,
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaColumn: {
    flex: 1,
    gap: 4,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  footnote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footnoteText: {
    fontSize: 11,
    fontStyle: 'italic',
  },
});
