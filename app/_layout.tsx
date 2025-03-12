import React, { useEffect, ReactElement } from "react";
import { Stack } from "expo-router";
import { useColorScheme, ColorSchemeName } from "react-native";
import { StatusBar } from "expo-status-bar";
import { getNavigationConfig, useTheme } from "../constants/config";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * Root layout component that configures the navigation stack
 * 
 * This component serves as the main layout wrapper for the entire application.
 * It sets up the navigation structure and global UI elements like the status bar.
 * 
 * In Expo Router, _layout files define the structure and appearance of all screens within that directory.
 * 
 * @returns {ReactElement} The configured Stack navigator
 */
export default function RootLayout(): ReactElement {
  // Get the user's color scheme preference (light or dark mode)
  // TypeScript note: useColorScheme returns 'light' | 'dark' | null
  const colorScheme: ColorSchemeName = useColorScheme();
  
  // Get theme using our custom hook
  const { theme } = useTheme(colorScheme);
  
  // Get navigation configuration based on current theme
  const navConfig = getNavigationConfig(theme);
  
  // Set up any global app effects using the useEffect hook
  // This hook runs when the component mounts and when dependencies change
  useEffect((): (() => void) => {
    // This function runs when the component mounts (app starts)
    console.log("App initialized");
    
    // Initialize any app-wide services or listeners here
    // Examples: analytics setup, notification listeners, etc.
    
    // The return function is a cleanup function that runs when the component unmounts
    return (): void => {
      // Clean up any listeners or services when the app closes
      console.log("App cleanup");
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 
        React Fragment (<></>) lets us return multiple elements without adding extra nodes to the DOM
        This is useful when you need to return multiple components side by side
      */}
      
      {/* Status bar that adapts to color scheme */}
      {/* The StatusBar component from Expo controls the appearance of the device status bar */}
      <StatusBar 
        style={theme.colors.background === '#ffffff' ? 'dark' : 'light'} 
      />
      
      {/* 
        Main navigation stack 
        Stack is a navigator from Expo Router that provides a card-style navigation
        where screens slide in from the side
      */}
      <Stack
        screenOptions={{
          headerStyle: navConfig.headerOptions.headerStyle,
          headerTintColor: navConfig.headerOptions.headerTintColor,
          headerTitleStyle: navConfig.headerOptions.headerTitleStyle,
        }}
      >
        {/* 
          Configure specific screens within the stack
          Each Stack.Screen corresponds to a route/page in your app
        */}
        
        {/* Hide header on index (home) screen */}
        <Stack.Screen 
          name="index" // This matches the filename (index.tsx)
          options={{ 
            // Options specific to this screen
            title: "Home",
            headerShown: false // Hide the header completely on the home screen
          }} 
        />
        
        {/* About screen with custom title */}
        <Stack.Screen 
          name="about" 
          options={{ 
            title: "About",
            headerShown: true 
          }} 
        />
        
        {/* Carousel screen with custom title */}
        <Stack.Screen 
          name="carousel" 
          options={{ 
            title: "Carousel Examples",
            headerShown: true // Hide header as we have our own header in the carousel screen
          }} 
        />
        
        {/* Test screen with custom title */}
        <Stack.Screen 
          name="test" 
          options={{ 
            title: "Test",
            headerShown: true 
          }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
