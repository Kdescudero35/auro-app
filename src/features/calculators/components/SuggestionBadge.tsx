import * as Haptics from 'expo-haptics';
import { JSX } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@theme/index';

interface SuggestionBadgeProps {
  label: string;
  onPress?: () => void;
}

export function SuggestionBadge({ label, onPress }: SuggestionBadgeProps): JSX.Element {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => {
        if (!onPress) return;
        Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: 'rgba(22, 163, 74, 0.18)',
          borderColor: theme.colors.primary,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Sugerencia ${label}`}
    >
      <Text style={[styles.text, { color: theme.colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
