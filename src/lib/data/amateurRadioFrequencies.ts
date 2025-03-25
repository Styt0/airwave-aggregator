
import { Frequency } from '../types';
import { minutesAgo } from '../utils/calculationUtils';

// Amateur Radio Frequencies
export const amateurRadioFrequencies: Frequency[] = [
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
