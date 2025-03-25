
import { Frequency } from '../types';

// Local storage keys
const FAVORITES_KEY = 'radio-favorites';
const CUSTOM_FREQUENCIES_KEY = 'radio-custom-frequencies';

// Get favorites from local storage
export const getFavorites = (): string[] => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

// Save favorites to local storage
export const saveFavorites = (favoriteIds: string[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
};

// Toggle a frequency as favorite
export const toggleFavorite = (id: string): string[] => {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }
  
  saveFavorites(favorites);
  return favorites;
};

// Get custom frequencies from local storage
export const getCustomFrequencies = (): Frequency[] => {
  const stored = localStorage.getItem(CUSTOM_FREQUENCIES_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save custom frequencies to local storage
export const saveCustomFrequencies = (frequencies: Frequency[]): void => {
  localStorage.setItem(CUSTOM_FREQUENCIES_KEY, JSON.stringify(frequencies));
};
