
import { useState, useEffect, useCallback } from 'react';
import { UserLocation } from '@/lib/types';

export const useLocationManager = () => {
  const [userLocation, setUserLocation] = useState<UserLocation>({
    coordinates: null,
    loading: false,
    error: null,
  });

  const getUserLocation = useCallback(() => {
    setUserLocation(prev => ({
      ...prev,
      loading: true,
      error: null
    }));
    
    if (!navigator.geolocation) {
      setUserLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by your browser'
      }));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          loading: false,
          error: null
        });
      },
      (error) => {
        let errorMessage = 'Unknown error occurred while retrieving location';
        if (error.code === 1) {
          errorMessage = 'Permission denied to access location';
        } else if (error.code === 2) {
          errorMessage = 'Position unavailable';
        } else if (error.code === 3) {
          errorMessage = 'Timeout retrieving location';
        }
        
        setUserLocation({
          coordinates: null,
          loading: false,
          error: errorMessage
        });
      }
    );
  }, []);

  useEffect(() => {
    // Try to get location when component mounts
    getUserLocation();
  }, [getUserLocation]);

  return {
    userLocation,
    getUserLocation
  };
};
