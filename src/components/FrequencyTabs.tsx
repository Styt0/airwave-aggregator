import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FrequencyTable } from './FrequencyTable';
import { FavoriteFrequencies } from './FavoriteFrequencies';
import { MapView } from './MapView';
import { AddFrequencyDialog } from './AddFrequencyDialog';
import { Frequency, NewFrequencyInput, FrequencyCategory } from '@/lib/types';
import { Map, Star, Radio, Satellite, Globe, CloudLightning, Ship, Cpu, Plane, Radio as RadioIcon, BarChart3, Building2, Signal, Network, Radar, PlaneTakeoff } from 'lucide-react';

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

  const getCategories = (): FrequencyCategory[] => {
    const categories = new Set<FrequencyCategory>(
      frequencies.map(f => f.category as FrequencyCategory)
    );
    return ['All', ...Array.from(categories)] as FrequencyCategory[];
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Space': return <Globe className="h-3.5 w-3.5" />;
      case 'Satellite': return <Satellite className="h-3.5 w-3.5" />;
      case 'Airband': return <Plane className="h-3.5 w-3.5" />;
      case 'Weather': return <CloudLightning className="h-3.5 w-3.5" />;
      case 'Maritime': return <Ship className="h-3.5 w-3.5" />;
      case 'Digital': return <Cpu className="h-3.5 w-3.5" />;
      case 'Amateur': return <RadioIcon className="h-3.5 w-3.5" />;
      case 'VOLMET': return <CloudLightning className="h-3.5 w-3.5" />;
      case 'Utility': return <BarChart3 className="h-3.5 w-3.5" />;
      case 'Airport': return <Building2 className="h-3.5 w-3.5" />;
      case 'APRS': return <Signal className="h-3.5 w-3.5" />;
      case 'LoRa': return <Network className="h-3.5 w-3.5" />;
      case 'Meshtastic': return <Radar className="h-3.5 w-3.5" />;
      case 'ModeS': return <PlaneTakeoff className="h-3.5 w-3.5" />;
      default: return null;
    }
  };

  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    frequencies.forEach(freq => {
      counts[freq.category] = (counts[freq.category] || 0) + 1;
    });
    return counts;
  };
  
  const categoryCounts = getCategoryCounts();

  return (
    <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
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
          <TabsTrigger value="map" className="flex items-center gap-1.5">
            <Map className="h-3.5 w-3.5" />
            <span>Map View</span>
          </TabsTrigger>
        </TabsList>
        
        <AddFrequencyDialog 
          onAddFrequency={handleAddFrequency}
          userCoordinates={userCoordinates}
        />
      </div>
      
      {activeMainTab === 'all' && (
        <div className="mb-4 border-b flex overflow-x-auto pb-1 scrollbar-none">
          <TabsList className="bg-transparent p-0 h-auto">
            {getCategories().map(category => (
              <button
                key={category}
                onClick={() => setActiveSubTab(category)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSubTab === category
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {getCategoryIcon(category)}
                <span>{category}</span>
                {category !== 'All' && categoryCounts[category] && (
                  <span className="ml-1.5 h-4 min-w-4 px-1 inline-flex items-center justify-center rounded-full bg-muted-foreground/20 text-xs">
                    {categoryCounts[category]}
                  </span>
                )}
              </button>
            ))}
          </TabsList>
        </div>
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
