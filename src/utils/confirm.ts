import { Alert } from 'react-native';

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

/**
 * Confirmación nativa basada en Alert.alert.
 * Devuelve una promesa booleana.
 */
export const confirm = ({
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  destructive = false,
}: ConfirmOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: cancelLabel,
          style: 'cancel',
          onPress: () => resolve(false),
        },
        {
          text: confirmLabel,
          style: destructive ? 'destructive' : 'default',
          onPress: () => resolve(true),
        },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
};
