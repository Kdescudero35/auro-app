import { Ionicons } from '@expo/vector-icons';
import { useMemo, JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { calculateBioseguridadDosage } from '@features/calculators/utils/calculations';
import type { BioseguridadProduct } from '@features/calculators/types';
import { Button } from '@features/shared/components/Button';
import { useQuotationStore } from '@store/quotationStore';
import { useTheme } from '@theme/index';
import { formatNumber } from '@utils/format';

interface BioseguridadDosageResultProps {
  product: BioseguridadProduct;
  metrosCuadrados: number;
}

export function BioseguridadDosageResult({
  product,
  metrosCuadrados,
}: BioseguridadDosageResultProps): JSX.Element {
  const theme = useTheme();
  const addItem = useQuotationStore((s) => s.addItem);

  const dosage = useMemo(
    () => calculateBioseguridadDosage(product, { metrosCuadrados }),
    [product, metrosCuadrados],
  );

  const handleAdd = (): void => {
    addItem({
      producto: product.nombre,
      productoId: product.id,
      especialidad: 'Bioseguridad',
      categoria: 'bioseguridad',
      cantidadRequerida: Math.round(dosage.cantidadProducto),
      cantidadUnidad: dosage.unidadProducto,
      presentacion: product.presentaciones[0] ?? '',
      presentacionesDisponibles: product.presentaciones,
      precioUnitario: 0,
      principioActivo: product.principioActivo,
      formaAdministracion: product.indicacionUso,
      tiempoRetiro: product.tiempoRetiro,
    });

    Toast.show({
      type: 'success',
      text1: 'Agregado a la cotización',
      text2: `${product.nombre} · ${formatNumber(dosage.cantidadProducto)} ${dosage.unidadProducto}`,
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
              {product.indicacionUso}
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
            Solución Total
          </Text>
          <Text style={[styles.resultValue, { color: theme.colors.secondary }]}>
            {formatNumber(dosage.cantidadSolucionL)} L
          </Text>
        </View>

        <View
          style={[
            styles.resultBox,
            { backgroundColor: theme.colors.background, borderRadius: theme.radius.md },
          ]}
        >
          <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>
            Agua
          </Text>
          <Text style={[styles.resultValue, { color: theme.colors.textPrimary }]}>
            {formatNumber(dosage.cantidadAguaL)} L
          </Text>
        </View>

        <View
          style={[
            styles.resultBox,
            { backgroundColor: theme.colors.background, borderRadius: theme.radius.md },
          ]}
        >
          <Text style={[styles.resultLabel, { color: theme.colors.textSecondary }]}>
            Producto
          </Text>
          <Text style={[styles.resultValue, { color: theme.colors.primary }]}>
            {formatNumber(dosage.cantidadProducto)} {dosage.unidadProducto}
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
        Días sugeridos: {product.diasTratamientoSugerido}
      </Text>

      <View style={styles.footnote}>
        <Ionicons name="information-circle" size={14} color={theme.colors.textMuted} />
        <Text style={[styles.footnoteText, { color: theme.colors.textMuted }]}>
          Cálculo para una sola aplicación sobre el área ingresada.
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
    gap: 10,
  },
  resultBox: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  resultLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  resultValue: {
    fontSize: 18,
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
