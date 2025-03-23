import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { RadioTower, Waveform } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const allFreqs = getAllFrequencies();
        setFrequencies(allFreqs);
        
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
    
    const intervalId = setInterval(() => {
      setFrequencies(prevFreqs => {
        const updated = updateActivityStatus(prevFreqs);
        setFavoriteFrequencies(getFavoriteFrequencies(updated));
        return updated;
      });
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, [toast]);

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

  useEffect(() => {
    if (!frequencies.length) return;
    
    const filtered = getFrequenciesByCategory(frequencies, selectedCategory);
    setFilteredFrequencies(filtered);
  }, [selectedCategory, frequencies]);

  const handleToggleFavorite = (id: string) => {
    const updatedFavorites = toggleFavorite(id);
    setFavoriteIds(updatedFavorites);
    
    setFavoriteFrequencies(getFavoriteFrequencies(frequencies));
    
    const freq = frequencies.find(f => f.id === id);
    if (freq) {
      const isFavorite = updatedFavorites.includes(id);
      toast({
        title: isFavorite ? 'Added to favorites' : 'Removed from favorites',
        description: `${freq.name} has been ${isFavorite ? 'added to' : 'removed from'} your favorites`,
      });
    }
  };

  const handleAddFrequency = (data: NewFrequencyInput) => {
    const newFreq = addFrequency(data);
    
    setFrequencies(prev => {
      const updated = [...prev, newFreq];
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
          <header className="text-center">
            <div className="flex justify-end mb-2">
              <Link to="/signal-identification">
                <Button variant="outline" className="flex items-center gap-2">
                  <Waveform className="h-4 w-4" />
                  Signal Identification
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl animate-fade-in">
              Radio Frequency Database
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Browse radio frequencies sorted by location relevance and real-time activity
            </p>
          </header>
          
          <div className="w-full">
            <LocationSelector 
              userLocation={userLocation}
              onRequestLocation={requestUserLocation}
            />
          </div>
          
          <div className="w-full">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
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
