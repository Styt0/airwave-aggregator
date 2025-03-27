
import React, { useState, useEffect } from 'react';
import { FrequencyCategory, NewFrequencyInput, Frequency } from '@/lib/types';
import { getFrequenciesByCategory, addFrequency } from '@/lib/data';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FrequencyTabs } from '@/components/frequency-tabs/FrequencyTabs';
import { LocationSelector } from '@/components/LocationSelector';
import FrequencyHeader from '@/components/FrequencyHeader';
import { useFrequencyData } from '@/hooks/useFrequencyData';
import { useLocationManager } from '@/hooks/useLocationManager';
import { useFavoriteManager } from '@/hooks/useFavoriteManager';
import { useToast } from '@/components/ui/use-toast';
import { MapProvider } from '@/components/MapContext';

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<FrequencyCategory>('All');
  const [filteredFrequencies, setFilteredFrequencies] = useState<Frequency[]>([]);
  
  const {
    frequencies,
    setFrequencies,
    favoriteFrequencies,
    setFavoriteFrequencies,
    favoriteIds,
    setFavoriteIds,
    loading,
    userLocation,
    setUserLocation
  } = useFrequencyData();
  
  const { getUserLocation } = useLocationManager();
  
  const { handleToggleFavorite } = useFavoriteManager(
    frequencies,
    setFavoriteIds,
    setFavoriteFrequencies
  );

  useEffect(() => {
    if (!frequencies.length) return;
    
    const filtered = getFrequenciesByCategory(frequencies, selectedCategory);
    setFilteredFrequencies(filtered);
  }, [selectedCategory, frequencies]);

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

  return (
    <MapProvider>
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8">
          <div className="flex flex-col space-y-6">
            <FrequencyHeader />
            
            <div className="w-full">
              <LocationSelector 
                userLocation={userLocation}
                onRequestLocation={getUserLocation}
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
    </MapProvider>
  );
};

export default Index;
