
import { Frequency } from '../types';
import { minutesAgo } from '../utils/calculationUtils';

// VOLMET frequencies from dxinfocentre.com
export const volmetFrequencies: Frequency[] = [
  {
    id: 'volmet-1',
    frequency: '3.413',
    name: 'Shannon VOLMET',
    description: 'Aviation weather for North Atlantic, UK, and Ireland',
    category: 'VOLMET',
    location: {
      name: 'Shannon, Ireland',
      coordinates: { latitude: 52.702, longitude: -8.925 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'USB',
    source: 'DX Info Centre',
    schedule: 'H+00, H+30',
    language: 'English'
  },
  {
    id: 'volmet-2',
    frequency: '5.505',
    name: 'Shannon VOLMET',
    description: 'Aviation weather for North Atlantic, UK, and Ireland (Alt)',
    category: 'VOLMET',
    location: {
      name: 'Shannon, Ireland',
      coordinates: { latitude: 52.702, longitude: -8.925 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'yellow',
    mode: 'USB',
    source: 'DX Info Centre',
    schedule: 'H+00, H+30',
    language: 'English'
  },
  {
    id: 'volmet-3',
    frequency: '8.957',
    name: 'New York VOLMET',
    description: 'Aviation weather for North America and Atlantic',
    category: 'VOLMET',
    location: {
      name: 'New York, USA',
      coordinates: { latitude: 40.713, longitude: -74.006 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'USB',
    source: 'DX Info Centre',
    schedule: 'H+00, H+20, H+40',
    language: 'English'
  },
  {
    id: 'volmet-4',
    frequency: '6.604',
    name: 'London VOLMET',
    description: 'Aviation weather for UK and Western Europe',
    category: 'VOLMET',
    location: {
      name: 'London, UK',
      coordinates: { latitude: 51.507, longitude: -0.128 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'orange',
    mode: 'USB',
    source: 'DX Info Centre',
    schedule: 'Continuous',
    language: 'English'
  },
  {
    id: 'volmet-5',
    frequency: '11.253',
    name: 'RAF VOLMET',
    description: 'Military aviation weather for European bases',
    category: 'VOLMET',
    location: {
      name: 'UK',
      coordinates: { latitude: 51.507, longitude: -0.128 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'red',
    mode: 'USB',
    source: 'DX Info Centre',
    schedule: 'Continuous',
    language: 'English'
  },
  {
    id: 'volmet-6',
    frequency: '10.051',
    name: 'Stockholm VOLMET',
    description: 'Aviation weather for Scandinavia',
    category: 'VOLMET',
    location: {
      name: 'Stockholm, Sweden',
      coordinates: { latitude: 59.329, longitude: 18.069 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'USB',
    source: 'DX Info Centre',
    schedule: 'H+15, H+45',
    language: 'English'
  },
  {
    id: 'volmet-7',
    frequency: '127.600',
    name: 'Brussels VOLMET',
    description: 'Aviation weather for Brussels and surrounding airports',
    category: 'VOLMET',
    location: {
      name: 'Brussels, Belgium',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'AM',
    source: 'DX Info Centre',
    schedule: 'Continuous',
    language: 'English'
  },
  {
    id: 'volmet-8',
    frequency: '126.400',
    name: 'Paris VOLMET',
    description: 'Aviation weather for Paris and surrounding airports',
    category: 'VOLMET',
    location: {
      name: 'Paris, France',
      coordinates: { latitude: 48.857, longitude: 2.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'orange',
    mode: 'AM',
    source: 'DX Info Centre',
    schedule: 'Continuous',
    language: 'English/French'
  }
];
