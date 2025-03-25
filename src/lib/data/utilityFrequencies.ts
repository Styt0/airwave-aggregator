
import { Frequency } from '../types';
import { minutesAgo } from '../utils/calculationUtils';

// Utility DX frequencies from dxinfocentre.com
export const utilityFrequencies: Frequency[] = [
  {
    id: 'util-1',
    frequency: '4.583',
    name: 'German Navy',
    description: 'Naval communications, RTTY',
    category: 'Utility',
    location: {
      name: 'Germany',
      coordinates: { latitude: 52.520, longitude: 13.405 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'RTTY',
    source: 'DX Info Centre'
  },
  {
    id: 'util-2',
    frequency: '8.461',
    name: 'Russian Navy',
    description: 'Naval communications, CW',
    category: 'Utility',
    location: {
      name: 'Russia',
      coordinates: { latitude: 59.934, longitude: 30.335 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'yellow',
    mode: 'CW',
    source: 'DX Info Centre'
  },
  {
    id: 'util-3',
    frequency: '5.696',
    name: 'US Coast Guard',
    description: 'Search and rescue communications',
    category: 'Utility',
    location: {
      name: 'United States',
      coordinates: { latitude: 38.895, longitude: -77.037 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'USB',
    source: 'DX Info Centre'
  },
  {
    id: 'util-4',
    frequency: '6.739',
    name: 'US Air Force HFGCS',
    description: 'Global Command System, encrypted voice and data',
    category: 'Utility',
    location: {
      name: 'Multiple Sites',
      coordinates: { latitude: 38.895, longitude: -77.037 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'USB',
    source: 'DX Info Centre'
  },
  {
    id: 'util-5',
    frequency: '11.175',
    name: 'US Air Force HFGCS',
    description: 'Primary HFGCS frequency, EAMs and SKYKING broadcasts',
    category: 'Utility',
    location: {
      name: 'Multiple Sites',
      coordinates: { latitude: 38.895, longitude: -77.037 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'USB',
    source: 'DX Info Centre'
  },
  {
    id: 'util-6',
    frequency: '4.724',
    name: 'NATO Air Defense',
    description: 'TACAMO, Looking Glass, NATO air defense',
    category: 'Utility',
    location: {
      name: 'Multiple Sites',
      coordinates: { latitude: 50.850, longitude: 4.352 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'yellow',
    mode: 'USB',
    source: 'DX Info Centre'
  },
  {
    id: 'util-7',
    frequency: '10.000',
    name: 'WWV Time Signal',
    description: 'Standard time and frequency station',
    category: 'Utility',
    location: {
      name: 'Fort Collins, CO, USA',
      coordinates: { latitude: 40.681, longitude: -105.042 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'green',
    mode: 'AM',
    source: 'DX Info Centre',
    schedule: 'Continuous',
    language: 'English'
  },
  {
    id: 'util-8',
    frequency: '7.850',
    name: 'North Korean Voice of Korea',
    description: 'International broadcasting service of DPRK',
    category: 'Utility',
    location: {
      name: 'Pyongyang, North Korea',
      coordinates: { latitude: 39.019, longitude: 125.755 }
    },
    lastActivity: minutesAgo(Math.floor(Math.random() * 60)),
    activityStatus: 'orange',
    mode: 'AM',
    source: 'DX Info Centre',
    schedule: '1000-1050, 1300-1350, 1500-1550, 1900-1950 UTC',
    language: 'English'
  }
];
