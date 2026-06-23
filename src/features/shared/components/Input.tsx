import { forwardRef, ReactNode, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@theme/index';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  /** Componente derecho (badge, sufijo, etc.) */
  rightSlot?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextInputProps['style']>;
}

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { label, error, hint, rightSlot, containerStyle, inputStyle, onFocus, onBlur, ...rest },
  ref,
) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.colors.danger
    : focused
      ? theme.colors.primary
      : theme.colors.border;

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.field,
          {
            backgroundColor: theme.colors.background,
            borderColor,
            borderRadius: theme.radius.pill,
          },
        ]}
      >
        <TextInput
          ref={ref}
          style={[
            styles.input,
            {
              color: theme.colors.textPrimary,
              fontWeight: '700',
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.textMuted}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightSlot ? <View style={styles.rightSlot}>{rightSlot}</View> : null}
      </View>

      {error ? (
        <Text style={[styles.helper, { color: theme.colors.danger }]}>{error}</Text>
      ) : hint ? (
        <Text style={[styles.helper, { color: theme.colors.textMuted }]}>{hint}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 18,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  rightSlot: {
    marginLeft: 8,
  },
  helper: {
    fontSize: 12,
    marginLeft: 8,
  },
});
