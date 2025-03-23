
export type FrequencyCategory = 
  | 'Airband' 
  | 'VHF' 
  | 'UHF' 
  | 'Repeaters' 
  | 'CW' 
  | 'HF'
  | 'Satellite'
  | 'Space'
  | 'Military'
  | 'Weather'
  | 'Maritime'
  | 'Digital'
  | 'Amateur'  
  | 'VOLMET'    // For VOLMET frequencies
  | 'Utility'   // For utility stations
  | 'Airport'   // New category for airport frequencies
  | 'All';

export type ActivityStatus = 
  | 'green'   // active in the last 5 minutes
  | 'yellow'  // active in the last 10 minutes
  | 'orange'  // active in the last 30 minutes
  | 'red'     // active in the last hour
  | 'none';   // no recent activity

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Frequency {
  id: string;
  frequency: string;
  name: string;
  description: string;
  category: Exclude<FrequencyCategory, 'All'>;
  location: {
    name: string;
    coordinates: Coordinates;
  };
  activityStatus: ActivityStatus;
  lastActivity: Date | null;
  distance?: number; // Distance from user in km (calculated dynamically)
  isFavorite?: boolean; // New property to track favorite status
  offset?: string;      // For repeaters with offset
  tone?: string;        // CTCSS/DCS tone
  mode?: string;        // FM, DMR, D-STAR, etc.
  source?: string;      // Source of the frequency data
  schedule?: string;    // For scheduled broadcasts like VOLMET
  language?: string;    // Language of transmission
  operationHours?: string; // Hours of operation
  icaoCode?: string;    // ICAO code for airports
  iataCode?: string;    // IATA code for airports
  runways?: string[];   // Runway information
  services?: string[];  // Services available at the airport
  elevationFt?: number; // Airport elevation in feet
  type?: string;        // Type of airport (international, regional, etc.)
}

export interface NewFrequencyInput {
  frequency: string;
  name: string;
  description: string;
  category: Exclude<FrequencyCategory, 'All'>;
  location: {
    name: string;
    coordinates: Coordinates;
  };
  offset?: string;
  tone?: string;
  mode?: string;
  source?: string;
  schedule?: string;
  language?: string;
  operationHours?: string;
  icaoCode?: string;
  iataCode?: string;
  elevationFt?: number;
  type?: string;
}

export interface UserLocation {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}
