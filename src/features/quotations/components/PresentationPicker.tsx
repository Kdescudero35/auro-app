import { Ionicons } from '@expo/vector-icons';
import { useState, JSX } from 'react';
import { Modal, Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '@theme/index';

interface PresentationPickerProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function PresentationPicker({
  options,
  value,
  onChange,
}: PresentationPickerProps): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          styles.trigger,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.pill,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[styles.triggerText, { color: theme.colors.textPrimary }]}
        >
          {value || 'Selecciona'}
        </Text>
        <Ionicons name="chevron-down" size={14} color={theme.colors.textMuted} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          style={[styles.overlay, { backgroundColor: theme.colors.overlay }]}
          onPress={() => setOpen(false)}
        >
          <Pressable
            style={[
              styles.sheet,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.lg,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={[styles.sheetTitle, { color: theme.colors.textPrimary }]}>
              Selecciona presentación
            </Text>
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: pressed ? theme.colors.surfaceElevated : 'transparent',
                  },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.colors.textPrimary }]}>{opt}</Text>
                {opt === value ? (
                  <Ionicons name="checkmark" size={18} color={theme.colors.primary} />
                ) : null}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
    gap: 6,
  },
  triggerText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    width: '100%',
    maxWidth: 380,
    padding: 20,
    borderWidth: 1,
    gap: 8,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
