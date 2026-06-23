import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useQuotationStore } from '@store/quotationStore';
import { useTheme } from '@theme/index';

export default function TabsLayout(): JSX.Element {
  const theme = useTheme();
  const count = useQuotationStore((s) => s.items.length);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 64,
          paddingTop: 6,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="calculadoras"
        options={{
          title: 'Calculadoras',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="water-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cotizador"
        options={{
          title: 'Cotizador',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="calendar-outline" size={size} color={color} />
              {count > 0 ? (
                <View style={[styles.badge, { backgroundColor: theme.colors.danger }]}>
                  <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
                </View>
              ) : null}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 12,
  },
});
