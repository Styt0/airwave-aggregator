
import React, { useState, useEffect } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FrequencyTable } from '@/components/FrequencyTable';
import { LocationSelector } from '@/components/LocationSelector';
import { FrequencyCategory, UserLocation, Frequency } from '@/lib/types';
import { mockFrequencies, getFrequenciesByLocation, getFrequenciesByCategory, updateActivityStatus } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<FrequencyCategory>('All');
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [filteredFrequencies, setFilteredFrequencies] = useState<Frequency[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    coordinates: null,
    loading: false,
    error: null,
  });

  // Initialize frequencies
  useEffect(() => {
    // Simulate loading data from an API
    const loadData = async () => {
      setLoading(true);
      try {
        // Add a small delay to simulate API fetch
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would be an API call
        const data = mockFrequencies;
        setFrequencies(data);
        setFilteredFrequencies(data);
        
        // Request user location on initial load
        requestUserLocation();
      } catch (error) {
        console.error('Error loading frequency data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load frequency data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
    
    // Set up timer to periodically update activity status
    const intervalId = setInterval(() => {
      setFrequencies(prevFreqs => updateActivityStatus(prevFreqs));
    }, 15000); // Every 15 seconds
    
    return () => clearInterval(intervalId);
  }, [toast]);

  // Filter frequencies when category changes
  useEffect(() => {
    if (!frequencies.length) return;
    
    const filtered = getFrequenciesByCategory(frequencies, selectedCategory);
    setFilteredFrequencies(filtered);
  }, [selectedCategory, frequencies]);

  // Sort frequencies by location when user location changes
  useEffect(() => {
    if (!userLocation.coordinates || !frequencies.length) return;
    
    const { latitude, longitude } = userLocation.coordinates;
    const sortedFrequencies = getFrequenciesByLocation(frequencies, latitude, longitude);
    
    // Update the frequencies with distance information
    setFrequencies(sortedFrequencies);
  }, [userLocation.coordinates, frequencies.length]);

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

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl animate-fade-in">
              Radio Frequency Database
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Browse radio frequencies sorted by location relevance and real-time activity
            </p>
          </header>
          
          {/* Location Selector */}
          <div className="w-full">
            <LocationSelector 
              userLocation={userLocation}
              onRequestLocation={requestUserLocation}
            />
          </div>
          
          {/* Category Filter */}
          <div className="w-full">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          {/* Frequency Table */}
          <div className="w-full">
            <FrequencyTable 
              frequencies={filteredFrequencies}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
