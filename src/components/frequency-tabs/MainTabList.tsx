
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Star } from 'lucide-react';

interface MainTabListProps {
  activeTab: string;
  favoritesCount: number;
}

export const MainTabList: React.FC<MainTabListProps> = ({
  activeTab,
  favoritesCount
}) => {
  return (
    <TabsList>
      <TabsTrigger value="all">All Frequencies</TabsTrigger>
      <TabsTrigger value="favorites" className="flex items-center gap-1.5">
        <Star className="h-3.5 w-3.5" />
        <span>Favorites</span>
        {favoritesCount > 0 && (
          <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium">
            {favoritesCount}
          </span>
        )}
      </TabsTrigger>
      <TabsTrigger value="map" className="flex items-center gap-1.5">
        <Map className="h-3.5 w-3.5" />
        <span>Map View</span>
      </TabsTrigger>
    </TabsList>
  );
};
