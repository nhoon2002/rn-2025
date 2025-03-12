import React, { ReactElement } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  useColorScheme, 
  ColorSchemeName 
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../constants/config";

/**
 * About screen component that displays information about the app
 * 
 * @returns {ReactElement} The rendered component
 */
export default function AboutScreen(): ReactElement {
  // Get the router for navigation
  const router = useRouter();
  
  // Get the user's color scheme preference
  const colorScheme: ColorSchemeName = useColorScheme();
  
  // Get theme and styles
  const { theme, styles: dynamicStyles } = useTheme(colorScheme);
  
  /**
   * Handler for back button press
   * Navigates back to the home screen
   */
  const handleBackPress = (): void => {
    router.back(); // Go back to previous screen
    // Alternative: router.push("/"); // Navigate directly to home
  };
  
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.title, dynamicStyles.title]}>About This App</Text>
        
        <Text style={[styles.paragraph, dynamicStyles.text]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
          Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
          rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
          non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut 
          dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit 
          odio.
        </Text>
        
        <Text style={[styles.paragraph, dynamicStyles.text]}>
          Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue 
          lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. 
          Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque 
          faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. 
          Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia 
          scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu.
        </Text>
        
        <Text style={[styles.paragraph, dynamicStyles.text]}>
          Sed commodo, leo at suscipit dictum, quam est porttitor sapien, eget sodales 
          nibh elit id diam. Nulla facilisi. Donec egestas ligula vitae odio interdum 
          aliquet. Duis lectus turpis, luctus eget tincidunt eu, congue et odio. Duis 
          pharetra et nisl at faucibus. Quisque luctus pulvinar arcu, et molestie lectus 
          ultrices et. Sed diam urna, egestas ut ipsum vel, volutpat volutpat neque.
        </Text>
        
        <Pressable 
          style={[styles.button, dynamicStyles.button]}
          onPress={handleBackPress}
          accessibilityLabel="Back button"
          accessibilityHint="Returns to the home screen"
          accessibilityRole="button"
        >
          <Text style={dynamicStyles.buttonText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

/**
 * Base styles for the component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'center',
  }
}); 