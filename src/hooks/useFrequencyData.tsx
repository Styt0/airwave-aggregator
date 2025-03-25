
import { useState, useEffect } from 'react';
import { Frequency, UserLocation } from '@/lib/types';
import { 
  getAllFrequencies, 
  updateActivityStatus, 
  getFavorites, 
  getFavoriteFrequencies 
} from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

export const useFrequencyData = () => {
  const { toast } = useToast();
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
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
        setFavoriteFrequencies(getFavoriteFrequencies(allFreqs, favIds));
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
        setFavoriteFrequencies(getFavoriteFrequencies(updated, favoriteIds));
        return updated;
      });
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, [toast, favoriteIds]);

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

  return {
    frequencies,
    setFrequencies,
    favoriteFrequencies,
    setFavoriteFrequencies,
    favoriteIds,
    setFavoriteIds,
    loading,
    userLocation,
    setUserLocation
  };
};
