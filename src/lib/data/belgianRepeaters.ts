
import { Frequency } from '../types';
import { minutesAgo } from '../utils/calculationUtils';

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
  }
];
