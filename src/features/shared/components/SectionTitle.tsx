import { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@theme/index';

interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps): JSX.Element {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {title}
      </Text>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 14,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  line: {
    height: 1,
    width: '100%',
  },
});
