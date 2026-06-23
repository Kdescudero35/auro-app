import { Ionicons } from '@expo/vector-icons';
import { useCallback, JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { QuotationItem } from '@features/quotations/types';
import { useQuotationStore } from '@store/quotationStore';
import { useTheme } from '@theme/index';
import { confirm } from '@utils/confirm';
import { formatInteger } from '@utils/format';

import { CurrencyInput } from './CurrencyInput';
import { PresentationPicker } from './PresentationPicker';

export function QuotationTable(): JSX.Element {
  const theme = useTheme();
  const items = useQuotationStore((s) => s.items);
  const updatePrice = useQuotationStore((s) => s.updateItemPrice);
  const updatePresentation = useQuotationStore((s) => s.updateItemPresentation);
  const removeItem = useQuotationStore((s) => s.removeItem);

  const handleRemove = useCallback(
    async (item: QuotationItem) => {
      const ok = await confirm({
        title: '¿Eliminar producto?',
        message: `Se quitará "${item.producto}" de la cotización.`,
        confirmLabel: 'Eliminar',
        destructive: true,
      });
      if (ok) removeItem(item.id);
    },
    [removeItem],
  );

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surfaceElevated,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
            index > 0 && styles.cardSpacing,
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.productoText, { color: theme.colors.textPrimary }]}>
                {item.producto}
              </Text>
              <Text style={[styles.especialidadText, { color: theme.colors.textSecondary }]}>
                {item.especialidad}
              </Text>
            </View>
            <Pressable
              onPress={() => handleRemove(item)}
              style={({ pressed }) => [
                styles.deleteButton,
                {
                  backgroundColor: pressed ? 'rgba(239,68,68,0.18)' : 'transparent',
                },
              ]}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel={`Eliminar ${item.producto}`}
            >
              <Ionicons name="trash-outline" size={18} color={theme.colors.danger} />
            </Pressable>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>
                Cant. Requerida
              </Text>
              <Text style={[styles.fieldValue, { color: theme.colors.primary }]}>
                {formatInteger(item.cantidadRequerida)}{' '}
                <Text style={[styles.unitText, { color: theme.colors.textSecondary }]}>
                  {item.cantidadUnidad}
                </Text>
              </Text>
            </View>

            <View style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>
                Presentación
              </Text>
              <View style={styles.fieldInput}>
                <PresentationPicker
                  options={item.presentacionesDisponibles ?? []}
                  value={item.presentacion}
                  onChange={(v) => updatePresentation(item.id, v)}
                />
              </View>
            </View>

            <View style={styles.fieldRow}>
              <Text style={[styles.fieldLabel, { color: theme.colors.textSecondary }]}>
                Precio Unitario
              </Text>
              <View style={styles.fieldInput}>
                <CurrencyInput
                  value={item.precioUnitario}
                  onChange={(v) => updatePrice(item.id, v)}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  card: {
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  cardSpacing: {
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  productoText: {
    fontWeight: '800',
    fontSize: 15,
  },
  especialidadText: {
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 999,
  },
  cardBody: {
    gap: 10,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 0,
  },
  fieldValue: {
    fontWeight: '800',
    fontSize: 15,
  },
  unitText: {
    fontWeight: '600',
    fontSize: 12,
  },
  fieldInput: {
    flex: 1,
    maxWidth: 180,
    alignItems: 'flex-end',
  },
});
