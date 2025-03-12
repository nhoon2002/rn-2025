/**
 * API Configuration
 * 
 * This file contains configuration for external APIs used in the application.
 * Values are read from environment variables when available.
 */

// Default values as fallbacks (these should be dummy/development values)
const DEFAULT_API_KEY = '7767e89d9d3ebf14bce098b3f3fc1cff';
const DEFAULT_AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzY3ZTg5ZDlkM2ViZjE0YmNlMDk4YjNmM2ZjMWNmZiIsIm5iZiI6MTQ5OTg1NDAxMy4yNTksInN1YiI6IjU5NjVmNGI5OTI1MTQxMGE1OTEyMjE4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IOFSoiQnn6Koy4gRwKAiZAk1EjGZVOzqAn9r0QeSKnM';

// TMDB API Configuration
export const TMDB_CONFIG = {
  // Use environment variables if available, otherwise use defaults
  API_KEY: process.env.TMDB_API_KEY || DEFAULT_API_KEY,
  AUTH_TOKEN: process.env.TMDB_AUTH_TOKEN || DEFAULT_AUTH_TOKEN,
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
};

/**
 * Get the TMDB API options for fetch requests
 * 
 * @returns {Object} The fetch options with authorization header
 */
export const getTMDBOptions = () => {
  return {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_CONFIG.AUTH_TOKEN}`
    }
  };
};

/**
 * Get the URL for a TMDB image
 * 
 * @param {string} path - The image path from the API
 * @param {string} size - The desired image size (w500, original, etc.)
 * @returns {string} The complete image URL
 */
export const getTMDBImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) {
    // Return a placeholder image URL if path is null or empty
    return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};