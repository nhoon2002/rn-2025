# Expo app.json Configuration Documentation

This document explains each property in the `app.json` file for your Expo React Native project.

## Basic App Information

- **name**: "rn-2025"
  - The display name of your app as it appears on the home screen of devices.

- **slug**: "rn-2025"
  - A unique identifier for your app in the Expo ecosystem. Used in URLs and as a machine-readable name.

- **version**: "1.0.0"
  - The version number of your application. Should follow semantic versioning (major.minor.patch).

## Display and UI

- **orientation**: "portrait"
  - Controls whether the app can run in portrait, landscape, or both modes. Options include "portrait", "landscape", or "default" (both).

- **icon**: "./assets/images/icon.png"
  - Path to the app icon used on the home screen of devices.

- **scheme**: "movies"
  - URL scheme for deep linking into your app. Allows other apps to open your app via links like "movies://".

- **userInterfaceStyle**: "automatic"
  - Controls whether the app uses light or dark mode. "automatic" adapts to system settings, other options are "light" or "dark".

- **newArchEnabled**: true
  - Enables the new React Native architecture (Fabric renderer and TurboModules) for better performance.

## Platform-Specific Configurations

### iOS

- **supportsTablet**: true
  - Whether the app is optimized for iPad. When true, the app will use iPad-specific UI elements.

### Android

- **adaptiveIcon**
  - Configuration for the adaptive icon on Android devices (Android 8.0+).
  - **foregroundImage**: "./assets/images/adaptive-icon.png"
    - The foreground image of the adaptive icon.
  - **backgroundColor**: "#ffffff"
    - The background color of the adaptive icon.

### Web

- **bundler**: "metro"
  - The bundler used for web builds. Metro is React Native's bundler.

- **output**: "static"
  - The output format for web builds. "static" generates static HTML/JS/CSS files.

- **favicon**: "./assets/images/favicon.png"
  - Path to the favicon used in the web browser.

## Plugins and Extensions

- **plugins**
  - Array of Expo plugins that extend functionality.
  
  - **expo-router**
    - Enables file-based routing with expo-router for navigation.
  
  - **expo-splash-screen**
    - Configuration for the splash screen shown during app loading.
    - **image**: "./assets/images/splash-icon.png"
      - Path to the splash screen image.
    - **imageWidth**: 200
      - Width of the splash image in pixels.
    - **resizeMode**: "contain"
      - How the splash image should be sized. Options include "contain", "cover", or "center".
    - **backgroundColor**: "#ffffff"
      - Background color of the splash screen.

## Experimental Features

- **experiments**
  - Experimental features that may not be fully stable.
  - **typedRoutes**: true
    - Enables type checking for routes in expo-router, providing better TypeScript support. 