import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { AcuiculturaCalculatedParams } from '@features/calculators/components/AcuiculturaCalculatedParams';
import { AcuiculturaDosageResult } from '@features/calculators/components/AcuiculturaDosageResult';
import { AcuiculturaForm } from '@features/calculators/components/AcuiculturaForm';
import { AcuiculturaProductSearch } from '@features/calculators/components/AcuiculturaProductSearch';
import { useAcuiculturaCalculator } from '@features/calculators/hooks/useAcuiculturaCalculator';
import type { AcuiculturaProduct } from '@features/calculators/types';
import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';

export function AcuiculturaScreen(): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const { form, values, calculations } = useAcuiculturaCalculator();
  const [selected, setSelected] = useState<AcuiculturaProduct | null>(null);
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
            ACUICULTURA
          </Text>
          <Text style={[styles.titleSubtitle, { color: theme.colors.textSecondary }]}>
            Dosificación por estanque
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <View style={styles.sections}>
        <AcuiculturaForm form={form} />

        <AcuiculturaCalculatedParams data={calculations} />
      </View>

      <View
        style={{ marginTop: 18 }}
        onLayout={(e) => { searchY.current = e.nativeEvent.layout.y; }}
      >
        <Card>
          <SectionTitle title="Catálogo de productos" />

          <AcuiculturaProductSearch
            selected={selected}
            onSelect={setSelected}
            onClear={() => setSelected(null)}
            onSearchFocus={() => {
              scrollRef.current?.scrollTo({ y: searchY.current, animated: true });
            }}
          />

          {selected ? (
            <View style={{ marginTop: 14 }}>
              <AcuiculturaDosageResult
                product={selected}
                biomasaKg={values.biomasaKg ?? 0}
                porcentajeConsumoDia={values.porcentajeConsumoDia ?? 0}
                volumenAguaTon={values.volumenAguaTon ?? 0}
                numeroPeces={values.numeroPeces ?? 0}
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
