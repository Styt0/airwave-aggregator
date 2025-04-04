import { Frequency } from '../types';
import { minutesAgo } from '../utils/calculationUtils';

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
