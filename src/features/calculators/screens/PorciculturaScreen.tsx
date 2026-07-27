import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { PorciculturaCalculatedParams } from '@features/calculators/components/PorciculturaCalculatedParams';
import { PorciculturaDosageResult } from '@features/calculators/components/PorciculturaDosageResult';
import { PorciculturaForm } from '@features/calculators/components/PorciculturaForm';
import { PorciculturaProductSearch } from '@features/calculators/components/PorciculturaProductSearch';
import { usePorciculturaCalculator } from '@features/calculators/hooks/usePorciculturaCalculator';
import type { PorciculturaProduct } from '@features/calculators/types';
import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';

export function PorciculturaScreen(): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const { form, values, calculations } = usePorciculturaCalculator();
  const [selected, setSelected] = useState<PorciculturaProduct | null>(null);
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const searchY = useRef(0);

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bottomOffset={20}
    >
      <View style={styles.headerRow}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={18} color={theme.colors.textSecondary} />
          <Text style={[styles.backText, { color: theme.colors.textSecondary }]}>
            Volver a Calculadoras
          </Text>
        </Pressable>

        <View style={styles.title}>
          <Text style={[styles.titleStrong, { color: theme.colors.textPrimary }]}>
            PORCICULTURA
          </Text>
          <Text style={[styles.titleSubtitle, { color: theme.colors.textSecondary }]}>
            Dosificación por corral
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <View style={styles.sections}>
        <PorciculturaForm
          form={form}
          pesoSugerido={calculations.pesoSugerido}
          consumoAlimentoSugerido={calculations.consumoAlimentoSugerido}
          consumoAguaSugerido={calculations.consumoAguaSugerido}
          etapaProductiva={calculations.etapaProductiva}
        />

        <PorciculturaCalculatedParams data={calculations} />
      </View>

      <View
        style={{ marginTop: 18 }}
        onLayout={(e) => { searchY.current = e.nativeEvent.layout.y; }}
      >
        <Card>
          <SectionTitle title="Catálogo de productos" />

          <PorciculturaProductSearch
            selected={selected}
            onSelect={setSelected}
            onClear={() => setSelected(null)}
            onSearchFocus={() => {
              scrollRef.current?.scrollTo({ y: searchY.current, animated: true });
            }}
          />

          {selected ? (
            <View style={{ marginTop: 14 }}>
              <PorciculturaDosageResult
                product={selected}
                numeroCerdos={values.numeroCerdos ?? 0}
                pesoKg={values.pesoKg ?? 0}
                consumoAlimentoKgDia={values.consumoAlimentoKgDia ?? 0}
                consumoAguaLitrosDia={values.consumoAguaLitrosDia ?? 0}
                diasTratamiento={values.diasTratamiento ?? 0}
              />
            </View>
          ) : null}
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 64,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    alignItems: 'flex-end',
  },
  titleStrong: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  titleSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  sections: {
    gap: 18,
  },
});
