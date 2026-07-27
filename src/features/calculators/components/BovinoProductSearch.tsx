import { Ionicons } from '@expo/vector-icons';
import { JSX, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useBovinoProductSearch } from '@features/calculators/hooks/useBovinoProductSearch';
import type { BovinoProduct } from '@features/calculators/types';
import { Input } from '@features/shared/components/Input';
import { useTheme } from '@theme/index';

interface BovinoProductSearchProps {
  selected: BovinoProduct | null;
  onSelect: (product: BovinoProduct) => void;
  onClear: () => void;
  onSearchFocus?: () => void;
}

export function BovinoProductSearch({
  selected,
  onSelect,
  onClear,
  onSearchFocus,
}: BovinoProductSearchProps): JSX.Element {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const { results } = useBovinoProductSearch(query);

  const handleSelect = (product: BovinoProduct): void => {
    onSelect(product);
    setQuery(product.nombre);
    setOpen(false);
  };

  const handleChange = (text: string): void => {
    setQuery(text);
    setOpen(true);
    if (text.length === 0 && selected) {
      onClear();
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Buscador predictivo de productos"
        value={query}
        onChangeText={handleChange}
        placeholder="Busca o selecciona un producto..."
        autoCorrect={false}
        autoCapitalize="none"
        onFocus={() => {
          setOpen(true);
          onSearchFocus?.();
        }}
        rightSlot={
          query.length > 0 ? (
            <Pressable
              onPress={() => {
                setQuery('');
                setOpen(false);
                onClear();
              }}
              hitSlop={8}
            >
              <Ionicons name="close-circle" size={18} color={theme.colors.textMuted} />
            </Pressable>
          ) : (
            <Ionicons name="search" size={18} color={theme.colors.textMuted} />
          )
        }
      />

      {open && results.length > 0 ? (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.colors.surfaceElevated,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <ScrollView keyboardShouldPersistTaps="always" nestedScrollEnabled>
            {results.map((item, index) => (
              <View key={item.id}>
                {index > 0 && (
                  <View style={[styles.separator, { backgroundColor: theme.colors.border }]} />
                )}
                <Pressable
                  onPress={() => handleSelect(item)}
                  style={({ pressed }) => [
                    styles.item,
                    pressed && { backgroundColor: theme.colors.surface },
                  ]}
                >
                  <Text style={[styles.itemTitle, { color: theme.colors.textPrimary }]}>
                    {item.nombre}
                  </Text>
                  <Text style={[styles.itemSubtitle, { color: theme.colors.textSecondary }]}>
                    {item.principioActivo} · {item.formaAdministracion}
                  </Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : null}

      {open && query.length > 0 && results.length === 0 ? (
        <View
          style={[
            styles.empty,
            {
              backgroundColor: theme.colors.surfaceElevated,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <Text style={{ color: theme.colors.textSecondary }}>
            Sin coincidencias para "{query}"
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  dropdown: {
    borderWidth: 1,
    maxHeight: 240,
    overflow: 'hidden',
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 2,
  },
  itemTitle: {
    fontWeight: '700',
    fontSize: 15,
  },
  itemSubtitle: {
    fontSize: 12,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  empty: {
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
});
