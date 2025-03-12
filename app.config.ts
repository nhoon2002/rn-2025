import { ExpoConfig, ConfigContext } from 'expo/config';

/**
 * Environment-specific configuration for the Expo app
 * 
 * This file allows you to configure different settings based on the environment
 * (development, staging, production)
 * 
 * @param {ConfigContext} param0 - Configuration context from Expo
 * @returns {ExpoConfig} The Expo configuration object
 */
export default ({ config }: ConfigContext): ExpoConfig => {
  // Get environment from environment variable or default to development
  const ENV = process.env.APP_ENV || process.env.NODE_ENV || 'development';
  const IS_DEV = ENV === 'development';
  const IS_PROD = ENV === 'production';
  
  // Environment-specific configurations
  if (IS_PROD) {
    // Production-specific configuration
    return {
      ...config,
      // Only override what's needed for production
      extra: {
        ...(config.extra || {}),
        env: ENV,
        apiUrl: 'https://api.example.com',
        enableAnalytics: true,
      }
    } as ExpoConfig;
  } else if (IS_DEV) {
    // Development-specific configuration
    return {
      ...config,
      // Only override what's needed for development
      extra: {
        ...(config.extra || {}),
        env: ENV,
        apiUrl: 'https://dev-api.example.com',
        enableAnalytics: false,
      },
      updates: {
        ...(config.updates || {}),
        enabled: true,
        checkAutomatically: 'ON_LOAD',
      },
    } as ExpoConfig;
  }
  return config as ExpoConfig;
};
