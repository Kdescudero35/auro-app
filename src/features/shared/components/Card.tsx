import { ReactNode, JSX } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useTheme } from '@theme/index';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Si se elimina el padding interno */
  noPadding?: boolean;
  /** Tono surface elevated vs base */
  elevated?: boolean;
}

export function Card({ children, style, noPadding, elevated }: CardProps): JSX.Element {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: elevated ? theme.colors.surfaceElevated : theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          padding: noPadding ? 0 : theme.spacing.lg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
  },
});
