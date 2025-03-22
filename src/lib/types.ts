
export type FrequencyCategory = 
  | 'Airband' 
  | 'VHF' 
  | 'UHF' 
  | 'Repeaters' 
  | 'CW' 
  | 'HF' 
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
}

export interface UserLocation {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}
