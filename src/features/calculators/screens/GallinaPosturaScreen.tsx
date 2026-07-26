import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { PosturaCalculatedParams } from '@features/calculators/components/PosturaCalculatedParams';
import { PosturaDosageResult } from '@features/calculators/components/PosturaDosageResult';
import { PosturaForm } from '@features/calculators/components/PosturaForm';
import { PosturaProductSearch } from '@features/calculators/components/PosturaProductSearch';
import { usePosturaCalculator } from '@features/calculators/hooks/usePosturaCalculator';
import type { PosturaProduct } from '@features/calculators/types';
import { Card } from '@features/shared/components/Card';
import { SectionTitle } from '@features/shared/components/SectionTitle';
import { useTheme } from '@theme/index';

export function GallinaPosturaScreen(): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const { form, values, calculations } = usePosturaCalculator();
  const [selected, setSelected] = useState<PosturaProduct | null>(null);
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
            GALLINA DE POSTURA
          </Text>
          <Text style={[styles.titleSubtitle, { color: theme.colors.textSecondary }]}>
            Dosificación por semana
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      <View style={styles.sections}>
        <PosturaForm
          form={form}
          pesoSugerido={calculations.pesoSugerido}
          consumoAlimentoSugerido={calculations.consumoAlimentoSugerido}
          consumoAguaSugerido={calculations.consumoAguaSugerido}
        />

        <PosturaCalculatedParams data={calculations} />
      </View>

      <View
        style={{ marginTop: 18 }}
        onLayout={(e) => { searchY.current = e.nativeEvent.layout.y; }}
      >
        <Card>
          <SectionTitle title="Catálogo de productos" />

          <PosturaProductSearch
            selected={selected}
            onSelect={setSelected}
            onClear={() => setSelected(null)}
            onSearchFocus={() => {
              scrollRef.current?.scrollTo({ y: searchY.current, animated: true });
            }}
          />

          {selected ? (
            <View style={{ marginTop: 14 }}>
              <PosturaDosageResult
                product={selected}
                consumoAlimentoDiarioKg={calculations.consumoAlimentoDiarioKg}
                consumoAguaDiarioLitros={calculations.consumoAguaDiarioLitros}
                diasTratamiento={values.diasTratamiento ?? 0}
                pesoGramos={values.pesoGramos ?? 0}
                numeroAves={values.numeroAves ?? 0}
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
