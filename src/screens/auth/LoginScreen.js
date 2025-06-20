import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  useTheme,
  Card,
  HelperText,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Navigation handled by AuthContext
      } else {
        Alert.alert('Login Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.colors.primary }]}>
            Karibu Tena! 🦁
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Welcome back to Tupatane
          </Text>
        </View>

        {/* Login Form */}
        <Card style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.formContent}>
            
            {/* Email Input */}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>

            {/* Password Input */}
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={!!errors.password}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password}
            </HelperText>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={[styles.loginButton, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              {loading ? 'Logging in...' : 'Karibu - Log In'}
            </Button>

            {/* Demo Credentials */}
            <View style={styles.demoCredentials}>
              <Text style={[styles.demoTitle, { color: theme.colors.onSurfaceVariant }]}>
                Demo Credentials:
              </Text>
              <Text style={[styles.demoText, { color: theme.colors.onSurfaceVariant }]}>
                Email: test@example.com
              </Text>
              <Text style={[styles.demoText, { color: theme.colors.onSurfaceVariant }]}>
                Password: password
              </Text>
            </View>

          </View>
        </Card>

        {/* Navigation Links */}
        <View style={styles.linksContainer}>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Signup')}
            labelStyle={[styles.linkText, { color: theme.colors.primary }]}
          >
            Hakuna account? Jisajili (Sign Up)
          </Button>
        </View>

        {/* Cultural Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            🇰🇪 "Pamoja Tunaweza" - Together We Can 🇰🇪
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  formCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    elevation: 2,
  },
  formContent: {
    padding: 24,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  demoCredentials: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  linksContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LoginScreen; 