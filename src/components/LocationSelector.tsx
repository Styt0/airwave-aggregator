
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserLocation } from '@/lib/types';
import { MapPin, Loader2, MapIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

interface LocationSelectorProps {
  userLocation: UserLocation;
  onRequestLocation: () => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  userLocation,
  onRequestLocation
}) => {
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  
  const form = useForm({
    defaultValues: {
      latitude: userLocation.coordinates?.latitude || 50.8503,
      longitude: userLocation.coordinates?.longitude || 4.3517
    }
  });

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
      
    // Try to automatically get user location on first load
    if (!userLocation.coordinates && !userLocation.loading && !userLocation.error) {
      onRequestLocation();
    }
  }, []);

  useEffect(() => {
    if (userLocation.coordinates) {
      form.setValue('latitude', userLocation.coordinates.latitude);
      form.setValue('longitude', userLocation.coordinates.longitude);
    }
  }, [userLocation.coordinates, form]);

  const formatCoordinates = (lat?: number, lon?: number) => {
    if (!lat || !lon) return 'Location not available';
    return `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
  };

  const handleManualLocationSubmit = (values: any) => {
    const customEvent = new CustomEvent('manualLocationSet', { 
      detail: { 
        latitude: parseFloat(values.latitude), 
        longitude: parseFloat(values.longitude) 
      } 
    });
    window.dispatchEvent(customEvent);
    
    toast({
      title: "Location updated",
      description: "Your custom location has been set"
    });
    
    setShowManualInput(false);
  };

  return (
    <div className="w-full glass-panel p-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-sm font-medium mb-1">Your Location</h3>
          <p className={cn(
            "text-sm",
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
        
        <div className="flex gap-2">
          <Dialog open={showManualInput} onOpenChange={setShowManualInput}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                <MapIcon className="h-4 w-4 mr-1" />
                Set Manually
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Custom Location</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleManualLocationSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.0001"
                            placeholder="e.g. 50.8503" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.0001"
                            placeholder="e.g. 4.3517" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Set Location
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
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
            {userLocation.coordinates ? "Update" : "Auto-Detect"}
          </Button>
        </div>
      </div>
      
      {userLocation.error && (
        <p className="text-xs text-destructive mt-2">
          {userLocation.error}
        </p>
      )}
    </div>
  );
};
