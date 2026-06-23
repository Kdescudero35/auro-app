import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@theme/index';

interface EmptyStateProps {
  icon?: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description?: string;
}

export function EmptyState({
  icon = 'document-outline',
  title,
  description,
}: EmptyStateProps): JSX.Element {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: theme.colors.surfaceElevated,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <Ionicons name={icon} size={32} color={theme.colors.textSecondary} />
      </View>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
      {description ? (
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 24,
    lineHeight: 18,
  },
});
