
import { Frequency, FrequencyCategory, NewFrequencyInput, Coordinates } from '../types';
import { mockFrequencies } from './mockFrequencies';
import { belgianRepeaters } from './belgianRepeaters';
import { volmetFrequencies } from './volmetFrequencies';
import { utilityFrequencies } from './utilityFrequencies';
import { amateurRadioFrequencies } from './amateurRadioFrequencies';
import { getCustomFrequencies, saveCustomFrequencies } from '../utils/storageUtils';
import { calculateDistance, getActivityStatus } from '../utils/calculationUtils';
import { v4 as uuidv4 } from 'uuid';

// Get all frequencies including custom ones
export const getAllFrequencies = (): Frequency[] => {
  return [
    ...mockFrequencies, 
    ...belgianRepeaters, 
    ...volmetFrequencies, 
    ...utilityFrequencies, 
    ...amateurRadioFrequencies,
    ...getCustomFrequencies()
  ];
};

// Get frequencies filtered by category
export const getFrequenciesByCategory = (
  frequencies: Frequency[],
  category: string
): Frequency[] => {
  if (category === 'All') return frequencies;
  return frequencies.filter(f => f.category === category);
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

// Get favorite frequencies
export const getFavoriteFrequencies = (
  frequencies: Frequency[], 
  favoriteIds: string[]
): Frequency[] => {
  return frequencies.filter(freq => favoriteIds.includes(freq.id));
};

// Update activity status for all frequencies based on their last activity time
export const updateActivityStatus = (frequencies: Frequency[]): Frequency[] => {
  return frequencies.map(freq => ({
    ...freq,
    activityStatus: getActivityStatus(freq.lastActivity)
  }));
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
