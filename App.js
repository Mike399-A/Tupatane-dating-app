import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { LocationProvider } from './src/contexts/LocationContext';
import { ChatProvider } from './src/contexts/ChatContext';
import { kenyanTheme } from './src/constants/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={kenyanTheme}>
        <NavigationContainer>
          <AuthProvider>
            <LocationProvider>
              <ChatProvider>
                <StatusBar style="light" backgroundColor={kenyanTheme.colors.primary} />
                <AppNavigator />
              </ChatProvider>
            </LocationProvider>
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 