
import { Frequency, ActivityStatus } from '../types';

// Helper function to generate an ISO date from minutes ago
export const minutesAgo = (minutes: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date;
};

// Helper function to determine activity status based on last activity
export const getActivityStatus = (lastActivityDate: Date | null): ActivityStatus => {
  if (!lastActivityDate) return 'none';
  
  const now = new Date();
  const diffMinutes = Math.floor((now.getTime() - lastActivityDate.getTime()) / (1000 * 60));
  
  if (diffMinutes <= 5) return 'green';
  if (diffMinutes <= 10) return 'yellow';
  if (diffMinutes <= 30) return 'orange';
  if (diffMinutes <= 60) return 'red';
  return 'none';
};

// Calculate distance between two points using Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return Math.round(distance * 10) / 10;
};

// Convert degrees to radians
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
