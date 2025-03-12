import React, { useCallback } from "react";
import { Text, View, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { useFocusEffect } from "expo-router";

/**
 * Home screen component that displays a centered button
 * This is the main entry point of the application
 * 
 * In Expo Router, the index.tsx file in the app directory becomes the home/default route
 * 
 * @returns {JSX.Element} The rendered component
 */
export default function HomeScreen() {
  // Get the user's color scheme preference (light or dark mode)
  // TypeScript note: useColorScheme returns 'light' | 'dark' | null
  const colorScheme = useColorScheme();
  
  /**
   * useFocusEffect is a hook from Expo Router that runs code when a screen comes into focus
   * This is useful for loading data or updating UI when a user navigates to this screen
   * 
   * useCallback is a React hook that memoizes a function to prevent unnecessary re-renders
   * It only recreates the function if one of the dependencies in the array changes
   */
  useFocusEffect(
    useCallback(() => {
      // This code runs every time the screen comes into focus (becomes visible)
      console.log("Home screen focused");
      
      // The return function is a cleanup function that runs when the screen loses focus
      return () => {
        // Clean up any resources or listeners when navigating away
        console.log("Home screen unfocused");
      };
    }, []) // Empty dependency array means this only depends on focus/unfocus events
  );

  /**
   * Handler for button press
   * Currently a placeholder function that will be implemented later for navigation
   * 
   * In React Native, you use event handlers like this to respond to user interactions
   */
  const handleButtonPress = () => {
    // This will be replaced with navigation code later
    console.log("Button pressed");
    
    // Example of what navigation might look like:
    // navigation.navigate('Details', { id: 123 });
  };

  // Determine styles based on color scheme for dark/light mode support
  // This is a common pattern for adapting UI to the user's preference
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <View 
      // In React Native, View is similar to a div in web development
      // It's a container component for other components
      style={[
        // You can pass an array of styles to a component
        // Later styles in the array override earlier ones if they conflict
        styles.container, 
        // This is an inline style that changes based on the color scheme
        { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }
      ]}
    >
      <TouchableOpacity 
        // TouchableOpacity is a wrapper that makes its children respond to touches
        // It provides a visual feedback by reducing the opacity when pressed
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? '#ffffff' : '#000000' }
        ]}
        // onPress is similar to onClick in web development
        onPress={handleButtonPress}
        // These props help screen readers understand the purpose of this element
        // Important for accessibility!
        accessibilityLabel="Navigation button"
        accessibilityHint="Navigates to another screen"
      >
        <Text 
          // Text is the only component that can display text in React Native
          // Unlike web, you can't just put text directly in a View
          style={[
            styles.buttonText,
            { color: isDarkMode ? '#000000' : '#ffffff' }
          ]}
        >
          Navigate
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * Styles for the component
 * 
 * In React Native, you use StyleSheet.create() instead of CSS
 * This provides better performance and error checking
 * 
 * Note: React Native uses a subset of CSS properties with some differences:
 * - All dimensions are unitless and represent density-independent pixels
 * - Styles are written in camelCase (backgroundColor instead of background-color)
 * - Flexbox is used for layout and is on by default (display: 'flex' is default)
 */
const styles = StyleSheet.create({
  container: {
    // flex: 1 makes the component expand to fill available space
    // This is important for making the container fill the whole screen
    flex: 1,
    // These are flexbox properties that center content both horizontally and vertically
    justifyContent: "center", // Centers items on the primary axis (vertical in column layout)
    alignItems: "center",     // Centers items on the cross axis (horizontal in column layout)
  },
  button: {
    // Padding adds space inside the component
    paddingVertical: 12,   // 12 units of padding on top and bottom
    paddingHorizontal: 24, // 24 units of padding on left and right
    borderRadius: 4,       // Rounds the corners of the button
    minWidth: 150,         // Ensures the button has a minimum width
    alignItems: "center",  // Centers the text horizontally within the button
    
    // Platform-specific styling:
    
    // Add shadow for iOS - these properties only affect iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Shadow direction and distance
    shadowOpacity: 0.2,                    // How transparent the shadow is
    shadowRadius: 2,                       // How blurry the shadow is
    
    // Add elevation for Android - this is the Android equivalent of shadow
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,       // Size of the text
    fontWeight: "bold", // Makes the text bold
  },
});
