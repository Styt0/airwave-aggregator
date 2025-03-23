
import React, { useState, useEffect } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FrequencyTabs } from '@/components/FrequencyTabs';
import { LocationSelector } from '@/components/LocationSelector';
import { FrequencyCategory, UserLocation, Frequency, NewFrequencyInput } from '@/lib/types';
import { 
  getAllFrequencies, 
  getFrequenciesByCategory, 
  updateActivityStatus, 
  getFavorites,
  toggleFavorite,
  getFavoriteFrequencies,
  addFrequency
} from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<FrequencyCategory>('All');
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [filteredFrequencies, setFilteredFrequencies] = useState<Frequency[]>([]);
  const [favoriteFrequencies, setFavoriteFrequencies] = useState<Frequency[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
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
        
        // Get all frequencies including custom ones
        const allFreqs = getAllFrequencies();
        setFrequencies(allFreqs);
        
        // Load favorites from local storage
        const favIds = getFavorites();
        setFavoriteIds(favIds);
        setFavoriteFrequencies(getFavoriteFrequencies(allFreqs));
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
      setFrequencies(prevFreqs => {
        const updated = updateActivityStatus(prevFreqs);
        // Also update favorites when activity status changes
        setFavoriteFrequencies(getFavoriteFrequencies(updated));
        return updated;
      });
    }, 15000); // Every 15 seconds
    
    return () => clearInterval(intervalId);
  }, [toast]);

  // Listen for manual location setting
  useEffect(() => {
    const handleManualLocationSet = (e: CustomEvent) => {
      const { latitude, longitude } = e.detail;
      
      setUserLocation({
        coordinates: { latitude, longitude },
        loading: false,
        error: null,
      });
    };
    
    window.addEventListener('manualLocationSet', handleManualLocationSet as EventListener);
    
    return () => {
      window.removeEventListener('manualLocationSet', handleManualLocationSet as EventListener);
    };
  }, []);

  // Filter frequencies when category changes
  useEffect(() => {
    if (!frequencies.length) return;
    
    const filtered = getFrequenciesByCategory(frequencies, selectedCategory);
    setFilteredFrequencies(filtered);
  }, [selectedCategory, frequencies]);

  // Handle favorites changes
  const handleToggleFavorite = (id: string) => {
    const updatedFavorites = toggleFavorite(id);
    setFavoriteIds(updatedFavorites);
    
    // Update the favorite frequencies list
    setFavoriteFrequencies(getFavoriteFrequencies(frequencies));
    
    // Show toast notification
    const freq = frequencies.find(f => f.id === id);
    if (freq) {
      const isFavorite = updatedFavorites.includes(id);
      toast({
        title: isFavorite ? 'Added to favorites' : 'Removed from favorites',
        description: `${freq.name} has been ${isFavorite ? 'added to' : 'removed from'} your favorites`,
      });
    }
  };

  // Handle adding a new frequency
  const handleAddFrequency = (data: NewFrequencyInput) => {
    const newFreq = addFrequency(data);
    
    // Update the frequencies list with the new frequency
    setFrequencies(prev => {
      const updated = [...prev, newFreq];
      // Also update filtered frequencies if needed
      setFilteredFrequencies(getFrequenciesByCategory(updated, selectedCategory));
      return updated;
    });
    
    toast({
      title: 'Frequency added',
      description: `${data.name} has been added to your frequencies`,
    });
  };

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
          
          {/* Frequencies (All & Favorites) */}
          <div className="w-full">
            <FrequencyTabs
              frequencies={filteredFrequencies}
              favorites={favoriteFrequencies}
              loading={loading}
              onToggleFavorite={handleToggleFavorite}
              userCoordinates={userLocation.coordinates}
              onAddFrequency={handleAddFrequency}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
