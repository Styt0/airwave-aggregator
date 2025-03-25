
import { Frequency } from '@/lib/types';
import { toggleFavorite, getFavoriteFrequencies } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

export const useFavoriteManager = (
  frequencies: Frequency[],
  setFavoriteIds: (ids: string[]) => void,
  setFavoriteFrequencies: (frequencies: Frequency[]) => void
) => {
  const { toast } = useToast();

  const handleToggleFavorite = (id: string) => {
    const updatedFavorites = toggleFavorite(id);
    setFavoriteIds(updatedFavorites);
    
    setFavoriteFrequencies(getFavoriteFrequencies(frequencies, updatedFavorites));
    
    const freq = frequencies.find(f => f.id === id);
    if (freq) {
      const isFavorite = updatedFavorites.includes(id);
      toast({
        title: isFavorite ? 'Added to favorites' : 'Removed from favorites',
        description: `${freq.name} has been ${isFavorite ? 'added to' : 'removed from'} your favorites`,
      });
    }
  };

  return { handleToggleFavorite };
};
