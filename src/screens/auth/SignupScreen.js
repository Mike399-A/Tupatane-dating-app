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
  Menu,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import { useAuth } from '../../contexts/AuthContext';
import { KENYAN_COUNTIES } from '../../constants/kenyanData';

const SignupScreen = ({ navigation }) => {
  const theme = useTheme();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    county: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [countyMenuVisible, setCountyMenuVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 18 || parseInt(formData.age) > 80) {
      newErrors.age = 'Age must be between 18 and 80';
    }
    
    if (!formData.county) {
      newErrors.county = 'Please select your county';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const selectedCounty = KENYAN_COUNTIES.find(c => c.name === formData.county);
      
      const result = await signup({
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        age: parseInt(formData.age),
        location: {
          county: selectedCounty.name,
          region: selectedCounty.region,
        },
      });
      
      if (result.success) {
        // Navigation to profile setup handled by AuthContext
        navigation.navigate('ProfileSetup');
      } else {
        Alert.alert('Signup Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.colors.primary }]}>
            Karibu Tupatane! 🦁
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Join Kenya's favorite dating community
          </Text>
        </View>

        {/* Signup Form */}
        <Card style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.formContent}>
            
            {/* Name Input */}
            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              error={!!errors.name}
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />
            <HelperText type="error" visible={!!errors.name}>
              {errors.name}
            </HelperText>

            {/* Email Input */}
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>

            {/* Age Input */}
            <TextInput
              label="Age"
              value={formData.age}
              onChangeText={(value) => updateFormData('age', value)}
              keyboardType="numeric"
              error={!!errors.age}
              style={styles.input}
              left={<TextInput.Icon icon="calendar" />}
            />
            <HelperText type="error" visible={!!errors.age}>
              {errors.age}
            </HelperText>

            {/* County Selection */}
            <Menu
              visible={countyMenuVisible}
              onDismiss={() => setCountyMenuVisible(false)}
              anchor={
                <TextInput
                  label="County"
                  value={formData.county}
                  error={!!errors.county}
                  style={styles.input}
                  editable={false}
                  right={<TextInput.Icon icon="chevron-down" onPress={() => setCountyMenuVisible(true)} />}
                  left={<TextInput.Icon icon="map-marker" />}
                  onPress={() => setCountyMenuVisible(true)}
                />
              }
            >
              <ScrollView style={styles.countyMenu}>
                {KENYAN_COUNTIES.map((county) => (
                  <Menu.Item
                    key={county.id}
                    onPress={() => {
                      updateFormData('county', county.name);
                      setCountyMenuVisible(false);
                    }}
                    title={`${county.name} (${county.region})`}
                  />
                ))}
              </ScrollView>
            </Menu>
            <HelperText type="error" visible={!!errors.county}>
              {errors.county}
            </HelperText>

            {/* Password Input */}
            <TextInput
              label="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
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

            {/* Confirm Password Input */}
            <TextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry={!showConfirmPassword}
              error={!!errors.confirmPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock-check" />}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            <HelperText type="error" visible={!!errors.confirmPassword}>
              {errors.confirmPassword}
            </HelperText>

            {/* Signup Button */}
            <Button
              mode="contained"
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
              style={[styles.signupButton, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              {loading ? 'Creating Account...' : 'Tupatane - Join Us!'}
            </Button>

          </View>
        </Card>

        {/* Navigation Links */}
        <View style={styles.linksContainer}>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            labelStyle={[styles.linkText, { color: theme.colors.primary }]}
          >
            Already have an account? Ingia (Log In)
          </Button>
        </View>

        {/* Cultural Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            🇰🇪 "Umoja ni Nguvu" - Unity is Strength 🇰🇪
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
    paddingVertical: 32,
  },
  greeting: {
    fontSize: 28,
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
  countyMenu: {
    maxHeight: 200,
  },
  signupButton: {
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
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

export default SignupScreen; 