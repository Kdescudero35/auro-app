import { useRouter } from 'expo-router';
import { useCallback, useState, JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

import { pdfService } from '@features/pdf/services/pdf.service';
import { QuotationClientForm } from '@features/quotations/components/QuotationClientForm';
import { QuotationHeader } from '@features/quotations/components/QuotationHeader';
import { QuotationTable } from '@features/quotations/components/QuotationTable';
import { Button } from '@features/shared/components/Button';
import { Card } from '@features/shared/components/Card';
import { EmptyState } from '@features/shared/components/EmptyState';
import { useQuotationStore } from '@store/quotationStore';
import { useTheme } from '@theme/index';
import { confirm } from '@utils/confirm';

export function CotizadorScreen(): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const items = useQuotationStore((s) => s.items);
  const total = useQuotationStore((s) => s.total());
  const clearItems = useQuotationStore((s) => s.clearItems);
  const clientName = useQuotationStore((s) => s.clientName);
  const farmName = useQuotationStore((s) => s.farmName);
  const vendorName = useQuotationStore((s) => s.vendorName);

  const [exporting, setExporting] = useState(false);

  const handleClear = useCallback(async () => {
    const ok = await confirm({
      title: '¿Vaciar la cotización?',
      message: 'Se eliminarán todos los productos agregados.',
      confirmLabel: 'Vaciar',
      destructive: true,
    });
    if (ok) {
      clearItems();
      Toast.show({ type: 'info', text1: 'Cotización vaciada' });
    }
  }, [clearItems]);

  const handleExport = useCallback(async () => {
    if (items.length === 0) {
      Toast.show({ type: 'error', text1: 'Agrega productos antes de exportar' });
      return;
    }
    try {
      setExporting(true);
      await pdfService.shareQuotation({
        clientName,
        farmName,
        vendorName,
        items,
        total,
        date: new Date().toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'No se pudo generar el PDF',
        text2: err instanceof Error ? err.message : 'Error desconocido',
      });
    } finally {
      setExporting(false);
    }
  }, [items, clientName, farmName, vendorName, total]);

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bottomOffset={20}
    >
      <Card>
        <QuotationHeader total={total} />

        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        <QuotationClientForm />

        {items.length === 0 ? (
          <EmptyState
            icon="calendar-outline"
            title="No hay productos en la cotización"
            description="Agrega productos desde el módulo de calculadoras para construir tu presupuesto."
          />
        ) : (
          <>
            <View style={styles.tableWrap}>
              <QuotationTable />
            </View>

            <View style={styles.actions}>
              <Button
                label="Vaciar Lista"
                variant="outline-danger"
                onPress={handleClear}
                style={styles.actionLeft}
              />
              <Button
                label="Descargar Cotización (PDF)"
                icon="download-outline"
                onPress={handleExport}
                loading={exporting}
                style={styles.actionRight}
              />
            </View>
          </>
        )}

        {items.length === 0 ? (
          <View style={styles.ctaWrap}>
            <Button
              label="Ir a calculadoras"
              icon="calculator-outline"
              variant="secondary"
              onPress={() => router.push('/calculadoras')}
            />
          </View>
        ) : null}
      </Card>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 48,
  },
  divider: {
    height: 1,
    marginVertical: 18,
  },
  tableWrap: {
    marginTop: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
    justifyContent: 'flex-end',
  },
  actionLeft: {
    flexShrink: 0,
  },
  actionRight: {
    flexShrink: 1,
  },
  ctaWrap: {
    marginTop: 12,
    alignItems: 'center',
  },
});
