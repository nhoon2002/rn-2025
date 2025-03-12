import React, { ReactElement, useRef, useState, useEffect } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  Image, 
  Pressable,
  useColorScheme, 
  ColorSchemeName,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../constants/config";
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate
} from "react-native-reanimated";
import { TMDB_CONFIG, getTMDBOptions, getTMDBImageUrl } from '../constants/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
  
/**
 * Interface for movie data from TMDB API
 */
interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * Interface for TMDB API response
 */
interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

/**
 * Carousel screen component that showcases different carousel examples
 * 
 * @returns {ReactElement} The rendered component
 */
export default function CarouselScreen(): ReactElement {
  // Get the router for navigation
  const router = useRouter();
  
  // Get the user's color scheme preference
  const colorScheme: ColorSchemeName = useColorScheme();
  
  // Get theme and styles
  const { theme, styles: dynamicStyles } = useTheme(colorScheme);
  
  // State to track the active carousel type
  const [carouselType, setCarouselType] = useState<string>('default');
  
  // State to store carousel items fetched from API
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Progress value for the parallax effect
  const progressValue = useSharedValue<number>(0);

  /**
   * Fetch movies from TMDB API
   */
  useEffect(() => {
    const fetchMovies = async (page: number = 1) => {
      setIsLoading(true);
      setError(null);
      
      try {
        const url = `${TMDB_CONFIG.BASE_URL}/discover/movie?language=en-US&page=${page}&sort_by=popularity.desc`;
        const options = getTMDBOptions();
        
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch movies from TMDB API');
        }
        
        const data: TMDBResponse = await response.json();
        setMovies(data.results);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Using sample data instead.');
        
        // Fallback to sample data
        setMovies([
          {
            id: 950396,
            title: "The Gorge",
            overview: "Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge.",
            poster_path: "/7iMBZzVZtG0oBug4TfqDb9ZxAOa.jpg",
            backdrop_path: "/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg",
            release_date: "2025-02-13",
            vote_average: 7.778,
            vote_count: 1817,
            popularity: 126.244,
            adult: false,
            genre_ids: [10749, 878, 53],
            original_language: "en",
            original_title: "The Gorge",
            video: false
          },
          {
            id: 1064213,
            title: "Anora",
            overview: "A young sex worker from Brooklyn gets her chance at a Cinderella story when she meets and impulsively marries the son of an oligarch.",
            poster_path: "/qh8m8Udz0sCa5gy9VaqfHPh0yPM.jpg",
            backdrop_path: "/87GU2ifjNYtgYtcRH1NNH1P4ODo.jpg",
            release_date: "2024-10-14",
            vote_average: 7.1,
            vote_count: 1602,
            popularity: 96.859,
            adult: false,
            genre_ids: [18, 35, 10749],
            original_language: "en",
            original_title: "Anora",
            video: false
          },
          {
            id: 762509,
            title: "Mufasa: The Lion King",
            overview: "Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline.",
            poster_path: "/lurEK87kukWNaHd0zYnsi3yzJrs.jpg",
            backdrop_path: "/1w8kutrRucTd3wlYyu5QlUDMiG1.jpg",
            release_date: "2024-12-18",
            vote_average: 7.5,
            vote_count: 1602,
            popularity: 84.488,
            adult: false,
            genre_ids: [12, 10751, 16],
            original_language: "en",
            original_title: "Mufasa: The Lion King",
            video: false
          },
          {
            id: 1241982,
            title: "Moana 2",
            overview: "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania.",
            poster_path: "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
            backdrop_path: "/zo8CIjJ2nfNOevqNajwMRO6Hwka.jpg",
            release_date: "2024-11-21",
            vote_average: 7.166,
            vote_count: 1811,
            popularity: 82.391,
            adult: false,
            genre_ids: [16, 12, 10751, 35],
            original_language: "en",
            original_title: "Moana 2",
            video: false
          },
          {
            id: 939243,
            title: "Sonic the Hedgehog 3",
            overview: "Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before.",
            poster_path: "/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
            backdrop_path: "/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg",
            release_date: "2024-12-19",
            vote_average: 7.7,
            vote_count: 2123,
            popularity: 78.835,
            adult: false,
            genre_ids: [28, 878, 35, 10751],
            original_language: "en",
            original_title: "Sonic the Hedgehog 3",
            video: false
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, []);
  
  /**
   * Handler for back button press
   * Navigates back to the home screen
   */
  const handleBackPress = (): void => {
    router.back(); // Go back to previous screen
  };
  
  /**
   * Renders a default carousel item
   */
  const renderDefaultItem = ({ item, index }: { item: TMDBMovie, index: number }) => {
    return (
      <View style={[styles.carouselItem, { backgroundColor: getRandomColor(item.id) }]}>
        <Image 
          source={{ uri: getTMDBImageUrl(item.poster_path) }} 
          style={styles.carouselImage} 
          resizeMode="cover"
        />
        <View style={styles.carouselContent}>
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselDescription} numberOfLines={2}>{item.overview}</Text>
          <Text style={styles.releaseInfo}>
            Release: {item.release_date} • Rating: {item.vote_average.toFixed(1)}/10
          </Text>
        </View>
      </View>
    );
  };
  /**
   * Generate a random color based on the movie ID for consistent coloring
   */
  const getRandomColor = (id: number): string => {
    const colors = [
      '#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#AA46BC',
      '#00ACC1', '#FF7043', '#9E9E9E', '#5C6BC0', '#26A69A'
    ];
    return colors[id % colors.length];
  };
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, dynamicStyles.container]}>
        <View style={styles.carouselContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
            </View>
          ) : (
            <>
              {carouselType === 'default' && (
                <Carousel
                  loop
                  width={SCREEN_WIDTH * 0.9}
                  height={SCREEN_WIDTH * 0.9 * (3/2)}
                  autoPlay={false}
                  data={movies}
                  scrollAnimationDuration={1000}
                  renderItem={renderDefaultItem}
                  onProgressChange={(progress) => {
                    progressValue.value = progress;
                  }}
                />
              )}
            </>
          )}
        </View>
        
        <Pressable 
          style={[styles.button, dynamicStyles.button]}
          onPress={handleBackPress}
          accessibilityLabel="Back button"
          accessibilityHint="Returns to the home screen"
          accessibilityRole="button"
        >
          <Text style={dynamicStyles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
}

/**
 * Styles for the component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  typeSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  typeButtonText: {
    fontWeight: '600',
    color: '#333',
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItem: {
    flex: 1,
    overflow: 'hidden',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '3px 3px 3px 10px rgba(255, 255, 255, 0)',
  },
  carouselImage: {
    maxWidth: '100%',
    width: '100%',
    aspectRatio: 2/3,
  },
  carouselContent: {
    padding: 15,
    flex: 1,
    justifyContent: 'flex-start',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  carouselDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginBottom: 4,
  },
  releaseInfo: {
    fontSize: 12,
    color: 'white',
    opacity: 0.7,
    fontStyle: 'italic',
    marginTop: 4,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  }
});
