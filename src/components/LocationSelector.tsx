
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { UserLocation } from '@/lib/types';
import { MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationSelectorProps {
  userLocation: UserLocation;
  onRequestLocation: () => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  userLocation,
  onRequestLocation
}) => {
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if location permission has been granted already
    navigator.permissions
      .query({ name: 'geolocation' as PermissionName })
      .then((result) => {
        if (result.state === 'granted') {
          setLocationGranted(true);
        } else if (result.state === 'denied') {
          setLocationGranted(false);
        } else {
          setLocationGranted(null);
        }
      });
  }, []);

  const formatCoordinates = (lat?: number, lon?: number) => {
    if (!lat || !lon) return 'Location not available';
    return `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
  };

  return (
    <div className="w-full glass-panel p-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground">Your Location</h3>
          <p className={cn(
            "text-sm mt-1",
            userLocation.coordinates ? "text-foreground" : "text-muted-foreground"
          )}>
            {userLocation.loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Detecting location...
              </span>
            ) : userLocation.coordinates ? (
              formatCoordinates(
                userLocation.coordinates.latitude,
                userLocation.coordinates.longitude
              )
            ) : (
              userLocation.error || "Location access required"
            )}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRequestLocation}
          disabled={userLocation.loading}
          className={cn(
            "transition-all duration-300",
            userLocation.coordinates ? "bg-secondary/50" : "bg-primary/10"
          )}
        >
          <MapPin className="h-4 w-4 mr-1" />
          {userLocation.coordinates ? "Update" : "Get Location"}
        </Button>
      </div>
      
      {userLocation.error && (
        <p className="text-xs text-destructive mt-2">
          {userLocation.error}
        </p>
      )}
    </div>
  );
};
