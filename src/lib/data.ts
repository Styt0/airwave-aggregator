import { Frequency, ActivityStatus, NewFrequencyInput } from './types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate an ISO date from minutes ago
const minutesAgo = (minutes: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

// Helper function to determine activity status based on last activity
const getActivityStatus = (lastActivityDate: Date | null): ActivityStatus => {
  if (!lastActivityDate) return 'none';
  
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - lastActivityDate.getTime()) / (1000 * 60));
  
  if (diffMinutes <= 5) return 'green';
  if (diffMinutes <= 10) return 'yellow';
  if (diffMinutes <= 30) return 'orange';
  if (diffMinutes <= 60) return 'red';
  return 'none';
};

// Generate mock frequencies with varying activity times for testing
export const mockFrequencies: Frequency[] = [
  {
    id: '1',
    frequency: '118.950',
    name: 'Brussels Airport ATIS',
    description: 'Automatic Terminal Information Service for Brussels Airport',
    category: 'Airband',
    location: {
      name: 'Brussels Airport',
      coordinates: { latitude: 50.9013, longitude: 4.4844 }
    },
    lastActivity: minutesAgo(2),
    activityStatus: 'green'
  },
  {
    id: '2',
    frequency: '119.350',
    name: 'Brussels Airport Tower',
    description: 'Main control tower frequency',
    category: 'Airband',
    location: {
      name: 'Brussels Airport',
      coordinates: { latitude: 50.9013, longitude: 4.4844 }
    },
    lastActivity: minutesAgo(7),
    activityStatus: 'yellow'
  },
  {
    id: '3',
    frequency: '121.800',
    name: 'Brussels Airport Ground',
    description: 'Ground control services',
    category: 'Airband',
    location: {
      name: 'Brussels Airport',
      coordinates: { latitude: 50.9013, longitude: 4.4844 }
    },
    lastActivity: minutesAgo(21),
    activityStatus: 'orange'
  },
  {
    id: '4',
    frequency: '126.905',
    name: 'Antwerp Approach',
    description: 'Approach control for Antwerp Airport',
    category: 'Airband',
    location: {
      name: 'Antwerp Airport',
      coordinates: { latitude: 51.1894, longitude: 4.4603 }
    },
    lastActivity: minutesAgo(45),
    activityStatus: 'red'
  },
  {
    id: '5',
    frequency: '145.500',
    name: 'VHF Calling Frequency',
    description: 'Common simplex calling frequency',
    category: 'VHF',
    location: {
      name: 'National',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(3),
    activityStatus: 'green'
  },
  {
    id: '6',
    frequency: '145.775',
    name: 'ON0LG Repeater',
    description: 'Repeater in Leuven',
    category: 'Repeaters',
    location: {
      name: 'Leuven',
      coordinates: { latitude: 50.8798, longitude: 4.7005 }
    },
    lastActivity: minutesAgo(18),
    activityStatus: 'orange'
  },
  {
    id: '7',
    frequency: '438.825',
    name: 'ON0ANT UHF Repeater',
    description: 'Antwerp repeater with wide coverage',
    category: 'UHF',
    location: {
      name: 'Antwerp',
      coordinates: { latitude: 51.2194, longitude: 4.4025 }
    },
    lastActivity: null,
    activityStatus: 'none'
  },
  {
    id: '8',
    frequency: '7.030',
    name: 'CW QRP Calling',
    description: 'QRP CW calling frequency',
    category: 'CW',
    location: {
      name: 'National',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(59),
    activityStatus: 'red'
  },
  {
    id: '9',
    frequency: '14.285',
    name: 'SSB International',
    description: '20m SSB common frequency',
    category: 'HF',
    location: {
      name: 'International',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(8),
    activityStatus: 'yellow'
  },
  {
    id: '10',
    frequency: '433.500',
    name: 'UHF Simplex',
    description: 'Popular UHF simplex frequency',
    category: 'UHF',
    location: {
      name: 'National',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(4),
    activityStatus: 'green'
  },
  {
    id: '11',
    frequency: '3.560',
    name: 'CW Regional',
    description: '80m regional CW frequency',
    category: 'CW',
    location: {
      name: 'Regional',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(29),
    activityStatus: 'orange'
  },
  {
    id: '12',
    frequency: '7.150',
    name: '40m Voice',
    description: 'Popular voice frequency in 40m band',
    category: 'HF',
    location: {
      name: 'International',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(15),
    activityStatus: 'orange'
  },
  {
    id: '13',
    frequency: '118.250',
    name: 'Liège Airport Tower',
    description: 'Liège Airport main control',
    category: 'Airband',
    location: {
      name: 'Liège Airport',
      coordinates: { latitude: 50.6374, longitude: 5.4437 }
    },
    lastActivity: minutesAgo(12),
    activityStatus: 'yellow'
  },
  {
    id: '14',
    frequency: '145.425',
    name: 'ON0DST Repeater',
    description: 'Digital voice repeater in Diest',
    category: 'Repeaters',
    location: {
      name: 'Diest',
      coordinates: { latitude: 50.9848, longitude: 5.0513 }
    },
    lastActivity: minutesAgo(1),
    activityStatus: 'green'
  },
  {
    id: '15',
    frequency: '433.125',
    name: 'ON0UHF Repeater',
    description: 'UHF repeater with excellent coverage',
    category: 'Repeaters',
    location: {
      name: 'Brussels',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(6),
    activityStatus: 'yellow'
  }
];

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

// Add a new custom frequency
export const addFrequency = (data: NewFrequencyInput): Frequency => {
  const customFrequencies = getCustomFrequencies();
  
  const newFrequency: Frequency = {
    id: uuidv4(),
    ...data,
    activityStatus: 'none',
    lastActivity: null
  };
  
  customFrequencies.push(newFrequency);
  saveCustomFrequencies(customFrequencies);
  
  return newFrequency;
};

// Calculate distance between two points using Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return Math.round(distance * 10) / 10;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

// Get frequencies sorted by distance to user location
export const getFrequenciesByLocation = (
  frequencies: Frequency[],
  userLat: number,
  userLon: number
): Frequency[] => {
  return [...frequencies].map(freq => ({
    ...freq,
    distance: calculateDistance(
      userLat,
      userLon,
      freq.location.coordinates.latitude,
      freq.location.coordinates.longitude
    )
  })).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
};

// Get frequencies filtered by category
export const getFrequenciesByCategory = (
  frequencies: Frequency[],
  category: string
): Frequency[] => {
  if (category === 'All') return frequencies;
  return frequencies.filter(f => f.category === category);
};

// Update activity status for all frequencies based on their last activity time
export const updateActivityStatus = (frequencies: Frequency[]): Frequency[] => {
  return frequencies.map(freq => ({
    ...freq,
    activityStatus: getActivityStatus(freq.lastActivity)
  }));
};

// Get all frequencies including custom ones
export const getAllFrequencies = (): Frequency[] => {
  return [...mockFrequencies, ...getCustomFrequencies()];
};

// Get favorite frequencies
export const getFavoriteFrequencies = (frequencies: Frequency[]): Frequency[] => {
  const favoriteIds = getFavorites();
  return frequencies.filter(freq => favoriteIds.includes(freq.id));
};
