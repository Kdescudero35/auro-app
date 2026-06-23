import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useCallback, JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeStore } from '@store/themeStore';
import { useTheme } from '@theme/index';
import { hp } from '@utils/Size';

interface HeaderProps {
  onReset?: () => void;
}

export function Header({ onReset }: HeaderProps): JSX.Element {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const toggleTheme = useThemeStore((s) => s.toggle);
  const scheme = useThemeStore((s) => s.scheme);

  const handleReset = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onReset?.();
  }, [onReset]);

  const handleToggleTheme = useCallback(() => {
    Haptics.selectionAsync();
    toggleTheme();
  }, [toggleTheme]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.headerBackground,
          paddingTop: insets.top + theme.spacing.sm,
        },
      ]}
    >
      <View style={styles.brand}>
        <View style={[styles.logoBox, { backgroundColor: 'rgba(255,255,255,0.16)' }]}>
          <MaterialCommunityIcons name="needle" size={22} color="#FFFFFF" />
        </View>
        <Text style={styles.brandText}>AuroApp</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={handleReset}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Restablecer"
          hitSlop={10}
        >
          <Ionicons name="refresh" size={18} color="#FFFFFF" />
          <Text style={styles.actionLabel}>Restablecer</Text>
        </Pressable>

        <Pressable
          onPress={handleToggleTheme}
          style={({ pressed }) => [styles.iconButton, pressed && styles.actionButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel="Cambiar tema"
          hitSlop={10}
        >
          <Ionicons
            name={scheme === 'dark' ? 'sunny' : 'moon'}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: hp(1.4),
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  actionButtonPressed: {
    opacity: 0.6,
  },
  actionLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
