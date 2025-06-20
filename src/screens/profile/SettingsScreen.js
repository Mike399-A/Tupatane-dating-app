import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const SettingsScreen = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.onSurface }]}>⚙️ Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  text: { fontSize: 18, fontWeight: 'bold' },
});

export default SettingsScreen; 