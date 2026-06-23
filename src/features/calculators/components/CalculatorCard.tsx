import * as Haptics from 'expo-haptics';
import { useCallback, JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { CalculatorOption } from '@features/calculators/types';
import { useTheme } from '@theme/index';

interface CalculatorCardProps {
  option: CalculatorOption;
  onPress: (option: CalculatorOption) => void;
}

export function CalculatorCard({ option, onPress }: CalculatorCardProps): JSX.Element {
  const theme = useTheme();

  const handlePress = useCallback(() => {
    if (!option.enabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(option);
  }, [option, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={!option.enabled}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: pressed ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.radius.lg,
          opacity: option.enabled ? 1 : 0.55,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={option.title}
      accessibilityState={{ disabled: !option.enabled }}
    >
      <View style={styles.emojiWrap}>
        <Text style={styles.emoji}>{option.emoji}</Text>
      </View>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{option.title}</Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        {option.description}
      </Text>
      {!option.enabled ? (
        <View style={[styles.badge, { backgroundColor: theme.colors.surfaceElevated }]}>
          <Text style={[styles.badgeText, { color: theme.colors.textMuted }]}>Próximamente</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 184,
    borderWidth: 1,
    padding: 18,
    gap: 8,
  },
  emojiWrap: {
    marginBottom: 28,
  },
  emoji: {
    fontSize: 42,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
