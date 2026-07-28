import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';

import { KILL_SWITCH_DEFAULT_MESSAGE } from '@constants/remoteConfig';
import { useTheme } from '@theme/index';

import { EmptyState } from './EmptyState';

interface MaintenanceScreenProps {
  message?: string;
}

export function MaintenanceScreen({ message }: MaintenanceScreenProps): JSX.Element {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <EmptyState
        icon="construct-outline"
        title="Servicio no disponible"
        description={message ?? KILL_SWITCH_DEFAULT_MESSAGE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
