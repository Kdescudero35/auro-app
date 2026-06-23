import { JSX } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { Input } from '@features/shared/components/Input';

interface NumberFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  rightSlot?: React.ReactNode;
  placeholder?: string;
}

/**
 * Adaptador que conecta Controller con `<Input>` y mantiene
 * el value en `number` (no string), gestionando la conversión.
 */
export function NumberField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  rightSlot,
  placeholder,
}: NumberFieldProps<TFieldValues>): JSX.Element {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          label={label}
          value={value === undefined || value === null ? '' : String(value)}
          onChangeText={(text) => {
            // permite vacío durante edición
            if (text === '') {
              onChange(undefined as unknown as number);
              return;
            }
            const sanitized = text.replace(/[^0-9.]/g, '');
            const parsed = Number(sanitized);
            onChange(Number.isFinite(parsed) ? parsed : (undefined as unknown as number));
          }}
          onBlur={onBlur}
          keyboardType="numeric"
          inputMode="numeric"
          placeholder={placeholder}
          rightSlot={rightSlot}
          error={error?.message}
        />
      )}
    />
  );
}
