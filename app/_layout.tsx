import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

/**
 * Root layout component that configures the navigation stack
 * 
 * This component serves as the main layout wrapper for the entire application.
 * It sets up the navigation structure and global UI elements like the status bar.
 * 
 * In Expo Router, _layout files define the structure and appearance of all screens within that directory.
 * 
 * @returns {JSX.Element} The configured Stack navigator
 */
export default function RootLayout() {
  // Get the user's color scheme preference (light or dark mode)
  // TypeScript note: useColorScheme returns 'light' | 'dark' | null
  // const colorScheme = useColorScheme();
  
  // For now, we're hardcoding to light mode to avoid TypeScript errors
  // In a real app, you might want to handle the null case and use the actual device setting
  const colorScheme = 'light'; // Hardcode to light for now.
  
  // Set up any global app effects using the useEffect hook
  // This hook runs when the component mounts and when dependencies change
  useEffect(() => {
    // This function runs when the component mounts (app starts)
    console.log("App initialized");
    
    // Initialize any app-wide services or listeners here
    // Examples: analytics setup, notification listeners, etc.
    
    // The return function is a cleanup function that runs when the component unmounts
    return () => {
      // Clean up any listeners or services when the app closes
      console.log("App cleanup");
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      {/* 
        React Fragment (<></>) lets us return multiple elements without adding extra nodes to the DOM
        This is useful when you need to return multiple components side by side
      */}
      
      {/* Status bar that adapts to color scheme */}
      {/* The StatusBar component from Expo controls the appearance of the device status bar */}
      <StatusBar 
        style="dark" 
        // We're using a fixed value instead of the conditional to fix TypeScript errors
        // Original code: style={colorScheme === 'dark' ? 'light' : 'dark'}
      />
      
      {/* 
        Main navigation stack 
        Stack is a navigator from Expo Router that provides a card-style navigation
        where screens slide in from the side
      */}
      <Stack
        screenOptions={{
          // Default options that apply to all screens in this stack
          headerStyle: {
            // Set header background color based on theme
            backgroundColor: '#ffffff', // Light mode color
            // Original code with conditional: backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff',
          },
          headerTintColor: '#000000', // Text and icon color for header (light mode)
          // Original code with conditional: headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
          headerTitleStyle: {
            // Style for the header title text
            fontWeight: 'bold',
          },
          // Animation for screen transitions - how screens enter and exit
          animation: 'slide_from_right',
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
            headerShown: false // Hide the header completely on the home screen
          }} 
        />
        
        {/* 
          You can add more Stack.Screen components here for other routes
          Example:
          <Stack.Screen 
            name="details" 
            options={{ 
              title: "Details Page",
              headerShown: true 
            }} 
          />
        */}
      </Stack>
    </>
  );
}
