import React, { useCallback, ReactElement } from "react";
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  useColorScheme, 
  ColorSchemeName,
  ViewStyle,
  TextStyle,
  Pressable
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { 
  getEnvironmentConfig, 
  useTheme,
  EnvConfig
} from "./constants/config";

/**
 * Interface for component props
 * Currently empty as this component doesn't receive props,
 * but defined for future extensibility
 */
interface HomeScreenProps {}

/**
 * Interface for the component's style sheet
 * Defines the expected structure of the styles object
 */
interface HomeScreenStyles {
  container: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  envLabel: TextStyle;
}

/**
 * Home screen component that displays a centered button
 * This is the main entry point of the application
 * 
 * In Expo Router, the index.tsx file in the app directory becomes the home/default route
 * 
 * @returns {ReactElement} The rendered component
 */
export default function HomeScreen({}: HomeScreenProps): ReactElement {
  // Get the user's color scheme preference (light or dark mode)
  // TypeScript note: useColorScheme returns 'light' | 'dark' | null
  const colorScheme: ColorSchemeName = useColorScheme();
  
  // Get environment-specific configuration
  const envConfig: EnvConfig = getEnvironmentConfig();
  
  // Get theme and styles using our custom hook
  const { theme, styles: dynamicStyles } = useTheme(colorScheme);
  
  // Get the router for navigation
  const router = useRouter();
  
  /**
   * useFocusEffect is a hook from Expo Router that runs code when a screen comes into focus
   * This is useful for loading data or updating UI when a user navigates to this screen
   * 
   * useCallback is a React hook that memoizes a function to prevent unnecessary re-renders
   * It only recreates the function if one of the dependencies in the array changes
   */
  useFocusEffect(
    useCallback((): (() => void) => {
      // This code runs every time the screen comes into focus (becomes visible)
      console.log("Home screen focused");
      
      // Log environment information when screen is focused
      console.log(`Environment: ${envConfig.environment}`);
      console.log(`API URL: ${envConfig.apiUrl}`);
      console.log(`Debug mode: ${envConfig.debug}`);
      
      // The return function is a cleanup function that runs when the screen loses focus
      return (): void => {
        // Clean up any resources or listeners when navigating away
        console.log("Home screen unfocused");
      };
    }, [envConfig]) // Dependency on envConfig
  );

  /**
   * Handler for button press
   * Navigates to the About screen
   * 
   * @returns {void}
   */
  const handleNavigate = (): void => {
    // Navigate to the About screen
    router.push("/about");
    
    // Log navigation for debugging
    console.log("Navigating to About screen");
  };
  
  /**
   * Handler for test button press
   * Navigates to the Test screen
   * 
   * @returns {void}
   */
  const handleNavigateToTest = (): void => {
    // Navigate to the Test screen
    router.push("/test");
    
    // Log navigation for debugging
    console.log("Navigating to Test screen");
  };
  
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Environment indicator - only shown in development */}
      {envConfig.debug && (
        <Text style={dynamicStyles.envLabel}>
          {envConfig.environment} Mode
        </Text>
      )}
      
      {/* Navigation buttons */}
      <Pressable 
        style={[styles.button, dynamicStyles.button]}
        onPress={handleNavigate}
        accessibilityLabel="About button"
        accessibilityHint="Navigates to the About screen"
        accessibilityRole="button"
      >
        <Text style={dynamicStyles.buttonText}>
          Go to About
        </Text>
      </Pressable>
      
      <View style={{ height: 20 }} />
      
      <Pressable 
        style={[styles.button, dynamicStyles.button]}
        onPress={handleNavigateToTest}
        accessibilityLabel="Test button"
        accessibilityHint="Navigates to the Test screen"
        accessibilityRole="button"
      >
        <Text style={dynamicStyles.buttonText}>
          Go to Test
        </Text>
      </Pressable>
    </View>
  );
}

/**
 * Base styles for the component
 * These styles don't change based on theme
 * 
 * In React Native, you use StyleSheet.create() instead of CSS
 * This provides better performance and error checking
 * 
 * Note: React Native uses a subset of CSS properties with some differences:
 * - All dimensions are unitless and represent density-independent pixels
 * - Styles are written in camelCase (backgroundColor instead of background-color)
 * - Flexbox is used for layout and is on by default (display: 'flex' is default)
 */
const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    // flex: 1 makes the component expand to fill available space
    // This is important for making the container fill the whole screen
    flex: 1,
    // These are flexbox properties that center content both horizontally and vertically
    justifyContent: "center", // Centers items on the primary axis (vertical in column layout)
    alignItems: "center",     // Centers items on the cross axis (horizontal in column layout)
  },
  button: {
    // These styles will be merged with the dynamic styles
    // Any properties defined in both will use the dynamic version
  },
  buttonText: {
    // Empty as we're using dynamic styles for text
  },
  envLabel: {
    // Empty as we're using dynamic styles for the environment label
  }
});
