import { ColorSchemeName, ViewStyle, TextStyle, Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * Environment configuration types
 */
export interface EnvConfig {
  environment: string;
  apiUrl: string;
  debug: boolean;
}

/**
 * Typography configuration
 * Defines font sizes and weights used throughout the app
 */
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700'
  }
};

/**
 * Spacing configuration
 * Defines consistent spacing values used throughout the app
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

/**
 * Theme configuration types
 */
export interface ThemeConfig {
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  spacing: typeof spacing;
  typography: typeof typography;
}

/**
 * Default light theme
 */
export const lightTheme: ThemeConfig = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#6200ee',
    secondary: '#03dac6',
    accent: '#ff4081',
    error: '#cf6679',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3'
  },
  spacing,
  typography
};

/**
 * Default dark theme
 */
export const darkTheme: ThemeConfig = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#bb86fc',
    secondary: '#03dac6',
    accent: '#cf6679',
    error: '#cf6679',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3'
  },
  spacing,
  typography
};

/**
 * Get environment configuration based on Expo config
 * 
 * This function reads environment settings directly from the Expo configuration
 * defined in app.config.ts, avoiding duplication of environment logic.
 * 
 * @returns {EnvConfig} Environment-specific configuration
 */
export const getEnvironmentConfig = (): EnvConfig => {
  // Get environment from Expo config
  const env = Constants.expoConfig?.extra?.env || 'development';
  const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'https://dev-api.example.com';
  const enableAnalytics = Constants.expoConfig?.extra?.enableAnalytics || false;
  
  return {
    environment: env === 'production' ? 'Production' : 'Development',
    apiUrl,
    debug: env !== 'production'
  };
};

/**
 * Get theme styles based on color scheme
 * 
 * @param {ColorSchemeName} colorScheme - The current color scheme ('light', 'dark', or null)
 * @returns {ThemeConfig} Theme configuration for the current color scheme
 */
export const getThemeConfig = (colorScheme: ColorSchemeName): ThemeConfig => {
  // If colorScheme is null, use the system default
  // For now, we're defaulting to light mode for consistency
  // const isDarkMode = colorScheme === 'dark';
  const isDarkMode = false; // Hardcoded to false for now
  
  return isDarkMode ? darkTheme : lightTheme;
};

/**
 * Simple hook to get theme and styles
 * 
 * @param {ColorSchemeName} colorScheme - The current color scheme
 * @returns {Object} Theme and dynamic styles
 */
export const useTheme = (colorScheme: ColorSchemeName) => {
  // Get the theme based on color scheme
  const theme = getThemeConfig(colorScheme);
  
  // Get dynamic styles based on theme
  const styles = getDynamicStyles(theme);
  
  return { theme, styles };
};

/**
 * Get dynamic styles based on the current theme
 * 
 * @param {ThemeConfig} theme - The current theme configuration
 * @returns {Object} Dynamic styles for components
 */
export const getDynamicStyles = (theme: ThemeConfig) => {
  return {
    container: {
      backgroundColor: theme.colors.background
    } as ViewStyle,
    
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: 4,
      minWidth: 150,
      alignItems: 'center',
      // Add shadow for iOS
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    } as ViewStyle,
    
    buttonText: {
      color: '#ffffff',
      fontSize: theme.typography.fontSizes.md,
      fontWeight: theme.typography.fontWeights.bold,
    } as TextStyle,
    
    title: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSizes.xl,
      fontWeight: theme.typography.fontWeights.bold,
    } as TextStyle,
    
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.fontSizes.md,
    } as TextStyle,
    
    envLabel: {
      position: 'absolute',
      top: 40,
      right: 10,
      backgroundColor: theme.colors.error,
      color: '#fff',
      padding: 5,
      borderRadius: 4,
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.bold,
    } as TextStyle
  };
};

/**
 * Navigation configuration
 * 
 * @param {ThemeConfig} theme - The current theme configuration
 * @returns Navigation configuration object with theme-aware styling
 */
export const getNavigationConfig = (theme: ThemeConfig) => {
  return {
    headerOptions: {
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        fontWeight: 'bold' as const,
      },
    }
  };
}; 