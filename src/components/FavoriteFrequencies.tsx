
import React from 'react';
import { Frequency } from '@/lib/types';
import { FrequencyItem } from './FrequencyItem';
import { useToast } from '@/components/ui/use-toast';
import { StarOff } from 'lucide-react';

interface FavoriteFrequenciesProps {
  favorites: Frequency[];
  onRemoveFavorite: (id: string) => void;
}

export const FavoriteFrequencies: React.FC<FavoriteFrequenciesProps> = ({ 
  favorites, 
  onRemoveFavorite 
}) => {
  const { toast } = useToast();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-xl">
        <StarOff className="w-10 h-10 mx-auto text-muted-foreground/50 mb-2" />
        <h3 className="text-lg font-medium text-muted-foreground">No favorite frequencies</h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Star frequencies to monitor them here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((freq) => (
        <FrequencyItem 
          key={freq.id} 
          frequency={freq} 
          isFavorite={true}
          onToggleFavorite={() => {
            onRemoveFavorite(freq.id);
            toast({
              title: 'Removed from favorites',
              description: `${freq.name} has been removed from your favorites`,
            });
          }}
        />
      ))}
    </div>
  );
};
