import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const handleGetStarted = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background with Kenyan Safari Image */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.overlay, { backgroundColor: 'rgba(34, 139, 34, 0.8)' }]}>
          <SafeAreaView style={styles.content}>
            
            {/* Logo and Title Section */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={[styles.logo, { color: theme.colors.surface }]}>
                  🦁 Tupatane
                </Text>
              </View>
              
              <Text style={[styles.subtitle, { color: theme.colors.surface }]}>
                Where Hearts Meet in Kenya
              </Text>
              
              <Text style={[styles.tagline, { color: theme.colors.surface }]}>
                "Karibu" to authentic connections
              </Text>
            </View>

            {/* Feature Highlights */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🌍</Text>
                <Text style={[styles.featureText, { color: theme.colors.surface }]}>
                  Connect across all 47 counties
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🫖</Text>
                <Text style={[styles.featureText, { color: theme.colors.surface }]}>
                  Discover "Chai Date" moments
                </Text>
              </View>
              
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🤝</Text>
                <Text style={[styles.featureText, { color: theme.colors.surface }]}>
                  Join "Harambee" community events
                </Text>
              </View>
            </View>

            {/* CTA Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={handleGetStarted}
                style={[styles.primaryButton, { backgroundColor: theme.colors.secondary }]}
                contentStyle={styles.buttonContent}
                labelStyle={[styles.buttonLabel, { color: theme.colors.onSecondary }]}
              >
                Tupatane - Let's Meet!
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleLogin}
                style={[styles.secondaryButton, { borderColor: theme.colors.surface }]}
                contentStyle={styles.buttonContent}
                labelStyle={[styles.buttonLabel, { color: theme.colors.surface }]}
              >
                Already have an account?
              </Button>
            </View>

            {/* Cultural Footer */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.colors.surface }]}>
                🇰🇪 Made with love for Kenya 🇰🇪
              </Text>
              <Text style={[styles.swahiliText, { color: theme.colors.surface }]}>
                "Harambee" - Let's pull together
              </Text>
            </View>

          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 48,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.9,
  },
  featuresContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  swahiliText: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default WelcomeScreen;