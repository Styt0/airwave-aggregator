
// Re-export all frequency datasets
export {
  belgianRepeaters
} from './data/belgianRepeaters';

export {
  volmetFrequencies
} from './data/volmetFrequencies';

export {
  utilityFrequencies
} from './data/utilityFrequencies';

export {
  mockFrequencies
} from './data/mockFrequencies';

export {
  amateurRadioFrequencies
} from './data/amateurRadioFrequencies';

// Re-export storage utilities
export {
  getFavorites,
  saveFavorites,
  toggleFavorite,
  getCustomFrequencies,
  saveCustomFrequencies
} from './utils/storageUtils';

// Re-export calculation utilities
export {
  calculateDistance,
  minutesAgo,
  getActivityStatus
} from './utils/calculationUtils';

// Re-export frequency manager functions
export {
  getAllFrequencies,
  getFrequenciesByCategory,
  getFrequenciesByLocation,
  getFavoriteFrequencies,
  updateActivityStatus,
  addFrequency
} from './data/frequencyManager';
