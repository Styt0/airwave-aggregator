
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrequencyTable } from './FrequencyTable';
import { FavoriteFrequencies } from './FavoriteFrequencies';
import { AddFrequencyDialog } from './AddFrequencyDialog';
import { Frequency, NewFrequencyInput } from '@/lib/types';
import { Star } from 'lucide-react';

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
      }
    });
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All Frequencies</TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {favorites.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <AddFrequencyDialog 
          onAddFrequency={handleAddFrequency}
          userCoordinates={userCoordinates}
        />
      </div>
      
      <TabsContent value="all" className="mt-0">
        <FrequencyTable 
          frequencies={frequencies}
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
    </Tabs>
  );
};
