
import { UserLocation } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

export const useLocationManager = (
  userLocation: UserLocation,
  setUserLocation: (location: UserLocation) => void
) => {
  const { toast } = useToast();

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setUserLocation({
        coordinates: null,
        loading: false,
        error: 'Geolocation is not supported by your browser',
      });
      return;
    }

    setUserLocation(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({
          coordinates: { latitude, longitude },
          loading: false,
          error: null,
        });
        
        toast({
          title: 'Location updated',
          description: 'Frequencies sorted by proximity to your location',
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
        setUserLocation({
          coordinates: null,
          loading: false,
          error: getGeolocationErrorMessage(error),
        });
        
        toast({
          title: 'Location error',
          description: getGeolocationErrorMessage(error),
          variant: 'destructive',
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const getGeolocationErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location access was denied. Please enable location in your browser settings.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get your location timed out.';
      default:
        return 'An unknown error occurred while getting your location.';
    }
  };

  return { requestUserLocation };
};
