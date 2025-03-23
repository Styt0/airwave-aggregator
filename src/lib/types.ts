
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
  | 'Amateur'  // New category for amateur radio
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
}

export interface UserLocation {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}
