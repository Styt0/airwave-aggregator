
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { FrequencyTable } from '../FrequencyTable';
import { FavoriteFrequencies } from '../FavoriteFrequencies';
import { MapView } from '../MapView';
import { AddFrequencyDialog } from '../frequency-dialog/AddFrequencyDialog';
import { Frequency, NewFrequencyInput, FrequencyCategory } from '@/lib/types';
import { MainTabList } from './MainTabList';
import { CategoryTabList } from './CategoryTabList';
import { getUniqueCategories } from './CategoryIcons';

interface FrequencyTabsProps {
  frequencies: Frequency[];
  favorites: Frequency[];
  loading: boolean;
  onToggleFavorite: (id: string) => void;
  userCoordinates: { latitude: number; longitude: number } | null;
  onAddFrequency: (data: NewFrequencyInput) => void;
}

export const FrequencyTabs: React.FC<FrequencyTabsProps> = ({
  frequencies,
  favorites,
  loading,
  onToggleFavorite,
  userCoordinates,
  onAddFrequency
}) => {
  const [activeMainTab, setActiveMainTab] = useState<string>('all');
  const [activeSubTab, setActiveSubTab] = useState<FrequencyCategory>('All');
  const favoriteIds = new Set(favorites.map(f => f.id));
  
  const handleAddFrequency = (
    values: any,
    coordinates: { latitude: number; longitude: number } | null
  ) => {
    onAddFrequency({
      frequency: values.frequency,
      name: values.name,
      description: values.description || '',
      category: values.category,
      location: {
        name: values.locationName,
        coordinates: coordinates || { latitude: 50.8503, longitude: 4.3517 } // Default to Brussels if no coordinates
      },
      offset: values.offset,
      tone: values.tone,
      mode: values.mode,
      source: values.source || 'User',
      callsign: values.callsign,
      symbol: values.symbol,
      course: values.course,
      speed: values.speed,
      altitude: values.altitude,
      comment: values.comment,
      path: values.path
    });
  };

  const filteredFrequencies = activeSubTab === 'All' 
    ? frequencies 
    : frequencies.filter(f => f.category === activeSubTab);

  const categories = getUniqueCategories(frequencies);

  return (
    <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
      <div className="flex justify-between items-center mb-4">
        <MainTabList 
          activeTab={activeMainTab}
          favoritesCount={favorites.length}
        />
        
        <AddFrequencyDialog 
          onAddFrequency={handleAddFrequency}
          userCoordinates={userCoordinates}
        />
      </div>
      
      {activeMainTab === 'all' && (
        <CategoryTabList
          categories={categories}
          activeCategory={activeSubTab}
          onCategoryChange={setActiveSubTab}
          frequencies={frequencies}
        />
      )}
      
      <TabsContent value="all" className="mt-0">
        <FrequencyTable 
          frequencies={filteredFrequencies}
          loading={loading}
          onToggleFavorite={onToggleFavorite}
          favorites={favoriteIds}
        />
      </TabsContent>
      
      <TabsContent value="favorites" className="mt-0">
        <FavoriteFrequencies 
          favorites={favorites}
          onRemoveFavorite={(id) => onToggleFavorite(id)}
        />
      </TabsContent>

      <TabsContent value="map" className="mt-0">
        <MapView 
          frequencies={frequencies}
          userCoordinates={userCoordinates}
          onSelectFrequency={(id) => {
            if (!favoriteIds.has(id)) {
              onToggleFavorite(id);
            }
          }}
        />
      </TabsContent>
    </Tabs>
  );
};
