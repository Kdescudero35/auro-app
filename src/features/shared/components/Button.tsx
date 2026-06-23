import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { JSX, ComponentProps, ReactNode, useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@theme/index';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type Variant = 'primary' | 'secondary' | 'danger' | 'outline-danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IoniconName;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  /** Slot custom para reemplazar el ícono Ionicons por otro */
  iconNode?: ReactNode;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  labelStyle,
  iconNode,
}: ButtonProps): JSX.Element {
  const theme = useTheme();

  const handlePress = useCallback(() => {
    if (disabled || loading) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }, [disabled, loading, onPress]);

  const palette = getVariantPalette(variant, theme.colors);
  const sizing = getSizing(size);

  const renderIcon = (): ReactNode => {
    if (iconNode) return iconNode;
    if (!icon) return null;
    return <Ionicons name={icon} size={sizing.iconSize} color={palette.text} />;
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: palette.background,
          borderColor: palette.border,
          paddingHorizontal: sizing.paddingX,
          paddingVertical: sizing.paddingY,
          borderRadius: theme.radius.pill,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        fullWidth && styles.fullWidth,
        variant !== 'primary' && styles.withBorder,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} size="small" />
      ) : (
        <>
          {iconPosition === 'left' && renderIcon()}
          <Text
            style={[
              styles.label,
              { color: palette.text, fontSize: sizing.fontSize },
              labelStyle,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
          {iconPosition === 'right' && renderIcon()}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  withBorder: {
    borderWidth: 1,
  },
  label: {
    fontWeight: '700',
  },
  fullWidth: {
    width: '100%',
  },
});

type Palette = {
  background: string;
  border: string;
  text: string;
};

function getVariantPalette(
  variant: Variant,
  colors: ReturnType<typeof useTheme>['colors'],
): Palette {
  switch (variant) {
    case 'secondary':
      return {
        background: colors.surfaceElevated,
        border: colors.border,
        text: colors.textPrimary,
      };
    case 'danger':
      return {
        background: colors.danger,
        border: colors.danger,
        text: '#FFFFFF',
      };
    case 'outline-danger':
      return {
        background: 'transparent',
        border: colors.danger,
        text: colors.danger,
      };
    case 'ghost':
      return {
        background: 'transparent',
        border: 'transparent',
        text: colors.textPrimary,
      };
    case 'primary':
    default:
      return {
        background: colors.primary,
        border: colors.primary,
        text: '#FFFFFF',
      };
  }
}

function getSizing(size: Size): {
  paddingX: number;
  paddingY: number;
  fontSize: number;
  iconSize: number;
} {
  switch (size) {
    case 'sm':
      return { paddingX: 14, paddingY: 8, fontSize: 13, iconSize: 16 };
    case 'lg':
      return { paddingX: 22, paddingY: 16, fontSize: 16, iconSize: 22 };
    case 'md':
    default:
      return { paddingX: 18, paddingY: 12, fontSize: 14, iconSize: 18 };
  }
}
