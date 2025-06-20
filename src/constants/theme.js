import { DefaultTheme } from 'react-native-paper';

// Kenyan-inspired color palette
export const KENYAN_COLORS = {
  // Primary colors
  safariGreen: '#228B22',
  maasaiRed: '#DC143C',
  
  // Secondary colors
  acaciaGold: '#FFD700',
  sunsetOrange: '#FF8C00',
  
  // Accent colors
  mountKenyaBlue: '#4169E1',
  savannaBrown: '#A0522D',
  
  // Neutrals
  warmWhite: '#FFF8DC',
  charcoalGrey: '#36454F',
  
  // Additional shades
  lightGreen: '#90EE90',
  darkGreen: '#006400',
  lightRed: '#FFB6C1',
  darkRed: '#8B0000',
  paleGold: '#FFFACD',
  darkBlue: '#191970',
  
  // System colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const kenyanTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: KENYAN_COLORS.safariGreen,
    primaryContainer: KENYAN_COLORS.lightGreen,
    secondary: KENYAN_COLORS.maasaiRed,
    secondaryContainer: KENYAN_COLORS.lightRed,
    tertiary: KENYAN_COLORS.acaciaGold,
    tertiaryContainer: KENYAN_COLORS.paleGold,
    surface: KENYAN_COLORS.warmWhite,
    surfaceVariant: '#F5F5F5',
    background: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: KENYAN_COLORS.charcoalGrey,
    onBackground: KENYAN_COLORS.charcoalGrey,
    outline: '#CCCCCC',
    outlineVariant: '#E0E0E0',
    accent: KENYAN_COLORS.sunsetOrange,
    success: KENYAN_COLORS.success,
    warning: KENYAN_COLORS.warning,
    error: KENYAN_COLORS.error,
    info: KENYAN_COLORS.info,
  },
  fonts: {
    ...DefaultTheme.fonts,
    displayLarge: {
      fontFamily: 'System',
      fontSize: 32,
      fontWeight: '700',
      letterSpacing: 0,
      lineHeight: 40,
    },
    headlineSmall: {
      fontFamily: 'System',
      fontSize: 24,
      fontWeight: '600',
      letterSpacing: 0,
      lineHeight: 32,
    },
    bodyLarge: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    labelLarge: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.1,
      lineHeight: 20,
    },
  },
  roundness: 12,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const GRADIENT_COLORS = {
  safari: [KENYAN_COLORS.safariGreen, KENYAN_COLORS.lightGreen],
  sunset: [KENYAN_COLORS.sunsetOrange, KENYAN_COLORS.acaciaGold],
  maasai: [KENYAN_COLORS.maasaiRed, KENYAN_COLORS.lightRed],
  mountain: [KENYAN_COLORS.mountKenyaBlue, KENYAN_COLORS.darkBlue],
};

export default kenyanTheme; 