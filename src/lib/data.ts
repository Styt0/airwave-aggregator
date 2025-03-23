
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

// Adding Belgian repeaters from RepeaterBook
export const belgianRepeaters: Frequency[] = [
  {
    id: 'rb-1',
    frequency: '145.600',
    name: 'ON0LG',
    description: 'Leuven - 430.125 to 439.9875 MHz, SSTV, RTTY, FAX',
    category: 'Repeaters',
    location: {
      name: 'Leuven',
      coordinates: { latitude: 50.878, longitude: 4.700 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    offset: '-0.600',
    tone: '103.5 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-2',
    frequency: '145.625',
    name: 'ON0UR',
    description: 'Uccle - Brussels, BXL Uccle, Open 24/7',
    category: 'Repeaters',
    location: {
      name: 'Brussels',
      coordinates: { latitude: 50.800, longitude: 4.350 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'yellow',
    offset: '-0.600',
    tone: '79.7 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-3',
    frequency: '145.650',
    name: 'ON0DK',
    description: 'Sint-Truiden - Linked to ON0DST',
    category: 'Repeaters',
    location: {
      name: 'Sint-Truiden',
      coordinates: { latitude: 50.817, longitude: 5.183 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    offset: '-0.600',
    tone: '71.9 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-4',
    frequency: '145.675',
    name: 'ON0NA',
    description: 'Namur - Mont de la Radio',
    category: 'Repeaters',
    location: {
      name: 'Namur',
      coordinates: { latitude: 50.467, longitude: 4.867 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'orange',
    offset: '-0.600',
    tone: '118.8 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-5',
    frequency: '145.750',
    name: 'ON0TN',
    description: 'Tournai - CTCSS required for TX & RX',
    category: 'Repeaters',
    location: {
      name: 'Tournai',
      coordinates: { latitude: 50.600, longitude: 3.383 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'red',
    offset: '-0.600',
    tone: '79.7 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-6',
    frequency: '430.150',
    name: 'ON0OV',
    description: 'Oudenaarde - Vlaamse Ardenen - East Flanders',
    category: 'Repeaters',
    location: {
      name: 'Oudenaarde',
      coordinates: { latitude: 50.850, longitude: 3.600 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'yellow',
    offset: '+1.600',
    tone: '79.7 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-7',
    frequency: '430.350',
    name: 'ON0BR',
    description: 'Bruges - West Flanders, 24/7',
    category: 'Repeaters',
    location: {
      name: 'Bruges',
      coordinates: { latitude: 51.210, longitude: 3.225 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    offset: '+1.600',
    tone: '79.7 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-8',
    frequency: '439.000',
    name: 'ON0OS',
    description: 'Ostend - Echolink Node 103884',
    category: 'Repeaters',
    location: {
      name: 'Ostend',
      coordinates: { latitude: 51.223, longitude: 2.917 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'none',
    offset: '-7.600',
    tone: '74.4 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-9',
    frequency: '431.700',
    name: 'ON0AN',
    description: 'Antwerpen - DTMF control',
    category: 'Repeaters',
    location: {
      name: 'Antwerp',
      coordinates: { latitude: 51.219, longitude: 4.402 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'orange',
    offset: '+1.600',
    tone: '79.7 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-10',
    frequency: '438.025',
    name: 'ON0LGE',
    description: 'Liege - APRS Gateway',
    category: 'Repeaters',
    location: {
      name: 'Liege',
      coordinates: { latitude: 50.633, longitude: 5.567 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    offset: '-7.600',
    tone: '74.4 Hz',
    mode: 'FM',
    source: 'RepeaterBook'
  },
  // Amateur Radio DMR Repeaters
  {
    id: 'rb-11',
    frequency: '439.4375',
    name: 'ON0CEA',
    description: 'Brussels DMR - CC1 - Amateur Digital Voice Network',
    category: 'Digital',
    location: {
      name: 'Brussels',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    offset: '-7.600',
    tone: 'CC1',
    mode: 'DMR',
    source: 'RepeaterBook'
  },
  {
    id: 'rb-12',
    frequency: '439.5125',
    name: 'ON0DB',
    description: 'Destelbergen - DMR Digital and Analog Voice',
    category: 'Digital',
    location: {
      name: 'Destelbergen',
      coordinates: { latitude: 51.067, longitude: 3.800 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'yellow',
    offset: '-7.600',
    tone: 'CC1',
    mode: 'DMR',
    source: 'RepeaterBook'
  },
  // DSTAR Repeaters
  {
    id: 'rb-13',
    frequency: '438.8125',
    name: 'ON0RIG B',
    description: 'Goutroux D-STAR - Gateway ON0RIG G',
    category: 'Digital',
    location: {
      name: 'Goutroux',
      coordinates: { latitude: 50.400, longitude: 4.383 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'orange',
    offset: '-7.600',
    tone: '',
    mode: 'D-STAR',
    source: 'RepeaterBook'
  },
  // Amateur Radio Frequencies
  {
    id: 'am-1',
    frequency: '14.074',
    name: 'FT8 International',
    description: 'FT8 Digital Mode - 20m Band - Very Popular',
    category: 'Amateur',
    location: {
      name: 'International',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'FT8',
    source: 'Amateur Radio Band Plan'
  },
  {
    id: 'am-2',
    frequency: '3.573',
    name: 'FT8 80m',
    description: 'FT8 Digital Mode - 80m Band - European Night Activity',
    category: 'Amateur',
    location: {
      name: 'Europe',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'FT8',
    source: 'Amateur Radio Band Plan'
  },
  {
    id: 'am-3',
    frequency: '7.074',
    name: 'FT8 40m',
    description: 'FT8 Digital Mode - 40m Band - Active Day & Night',
    category: 'Amateur',
    location: {
      name: 'Europe',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'FT8',
    source: 'Amateur Radio Band Plan'
  },
  {
    id: 'am-4',
    frequency: '144.800',
    name: 'APRS 2m',
    description: 'Automatic Packet Reporting System - VHF',
    category: 'Amateur',
    location: {
      name: 'Belgium',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'APRS',
    source: 'Amateur Radio Band Plan'
  },
  {
    id: 'am-5',
    frequency: '144.300',
    name: 'SSB Calling',
    description: '2m SSB/CW Calling Frequency',
    category: 'Amateur',
    location: {
      name: 'Europe',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'yellow',
    mode: 'SSB',
    source: 'Amateur Radio Band Plan'
  }
];

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
  },
  {
    id: '16',
    frequency: '145.800',
    name: 'ISS Downlink Voice',
    description: 'International Space Station voice communications downlink',
    category: 'Space',
    location: {
      name: 'Low Earth Orbit',
      coordinates: { latitude: 0, longitude: 0 }
    },
    lastActivity: minutesAgo(3),
    activityStatus: 'green'
  },
  {
    id: '17',
    frequency: '437.800',
    name: 'ISS Packet Radio',
    description: 'ISS APRS Packet Radio System',
    category: 'Space',
    location: {
      name: 'Low Earth Orbit',
      coordinates: { latitude: 0, longitude: 0 }
    },
    lastActivity: minutesAgo(17),
    activityStatus: 'orange'
  },
  {
    id: '18',
    frequency: '145.825',
    name: 'ISS Digipeater',
    description: 'ISS Digital Repeater for APRS',
    category: 'Space',
    location: {
      name: 'Low Earth Orbit',
      coordinates: { latitude: 0, longitude: 0 }
    },
    lastActivity: minutesAgo(8),
    activityStatus: 'yellow'
  },
  {
    id: '19',
    frequency: '137.100',
    name: 'NOAA-19 APT',
    description: 'NOAA Weather Satellite Automatic Picture Transmission',
    category: 'Satellite',
    location: {
      name: 'Polar Orbit',
      coordinates: { latitude: 0, longitude: 0 }
    },
    lastActivity: minutesAgo(45),
    activityStatus: 'red'
  },
  {
    id: '20',
    frequency: '137.620',
    name: 'METEOR-M2 LRPT',
    description: 'Russian Meteor Weather Satellite',
    category: 'Satellite',
    location: {
      name: 'Polar Orbit',
      coordinates: { latitude: 0, longitude: 0 }
    },
    lastActivity: minutesAgo(2),
    activityStatus: 'green'
  },
  {
    id: '21',
    frequency: '435.270',
    name: 'AMSAT OSCAR-7',
    description: 'One of the oldest operational amateur radio satellites',
    category: 'Satellite',
    location: {
      name: 'Polar Orbit',
      coordinates: { latitude: 0, longitude: 0 }
    },
    lastActivity: minutesAgo(30),
    activityStatus: 'orange'
  },
  {
    id: '22',
    frequency: '162.400',
    name: 'NOAA Weather Radio',
    description: 'National weather service broadcast',
    category: 'Weather',
    location: {
      name: 'National',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(5),
    activityStatus: 'green'
  },
  {
    id: '23',
    frequency: '162.425',
    name: 'NOAA Weather Alt',
    description: 'Alternative NOAA weather frequency',
    category: 'Weather',
    location: {
      name: 'National',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(9),
    activityStatus: 'yellow'
  },
  {
    id: '24',
    frequency: '243.000',
    name: 'Military Air Distress',
    description: 'Military aircraft emergency frequency',
    category: 'Military',
    location: {
      name: 'National Airspace',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: null,
    activityStatus: 'none'
  },
  {
    id: '25',
    frequency: '255.400',
    name: 'NATO Common',
    description: 'Common NATO military air operations',
    category: 'Military',
    location: {
      name: 'European Airspace',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(25),
    activityStatus: 'orange'
  },
  {
    id: '26',
    frequency: '156.800',
    name: 'Marine Channel 16',
    description: 'International maritime distress and calling frequency',
    category: 'Maritime',
    location: {
      name: 'Coastal Areas',
      coordinates: { latitude: 51.2194, longitude: 2.9282 }
    },
    lastActivity: minutesAgo(4),
    activityStatus: 'green'
  },
  {
    id: '27',
    frequency: '156.650',
    name: 'Marine Channel 13',
    description: 'Bridge-to-bridge navigation',
    category: 'Maritime',
    location: {
      name: 'Coastal Areas',
      coordinates: { latitude: 51.2194, longitude: 2.9282 }
    },
    lastActivity: minutesAgo(18),
    activityStatus: 'orange'
  },
  {
    id: '28',
    frequency: '14.070',
    name: 'FT8 20m',
    description: 'Popular FT8 digital mode frequency on 20m band',
    category: 'Digital',
    location: {
      name: 'International',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(1),
    activityStatus: 'green'
  },
  {
    id: '29',
    frequency: '7.074',
    name: 'FT8 40m',
    description: 'FT8 digital mode frequency on 40m band',
    category: 'Digital',
    location: {
      name: 'International',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(7),
    activityStatus: 'yellow'
  },
  {
    id: '30',
    frequency: '10.136',
    name: 'WSPR 30m',
    description: 'Weak Signal Propagation Reporter Network',
    category: 'Digital',
    location: {
      name: 'International',
      coordinates: { latitude: 50.8503, longitude: 4.3517 }
    },
    lastActivity: minutesAgo(15),
    activityStatus: 'orange'
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

// Get all frequencies including custom ones and Belgian repeaters
export const getAllFrequencies = (): Frequency[] => {
  return [...mockFrequencies, ...belgianRepeaters, ...getCustomFrequencies()];
};

// Get favorite frequencies
export const getFavoriteFrequencies = (frequencies: Frequency[]): Frequency[] => {
  const favoriteIds = getFavorites();
  return frequencies.filter(freq => favoriteIds.includes(freq.id));
};
