
import React, { useState, useEffect } from 'react';
import { Frequency } from '@/lib/types';
import { FrequencyItem } from './FrequencyItem';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FrequencyTableProps {
  frequencies: Frequency[];
  loading?: boolean;
  onToggleFavorite: (id: string) => void;
  favorites: Set<string>;
}

export const FrequencyTable: React.FC<FrequencyTableProps> = ({ 
  frequencies,
  loading = false,
  onToggleFavorite,
  favorites
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'distance' | 'activity' | 'frequency'>('distance');
  const [filteredFrequencies, setFilteredFrequencies] = useState<Frequency[]>(frequencies);
  const [showNewIndicator, setShowNewIndicator] = useState<Record<string, boolean>>({});
  const [displayLimit, setDisplayLimit] = useState(12);

  // Filter and sort frequencies
  useEffect(() => {
    let result = [...frequencies];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        f => f.name.toLowerCase().includes(query) || 
             f.description.toLowerCase().includes(query) ||
             f.frequency.includes(query) ||
             f.location.name.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    result = sortFrequencies(result, sortOption);
    
    setFilteredFrequencies(result);
  }, [frequencies, searchQuery, sortOption]);

  // Track new frequencies for highlighting
  useEffect(() => {
    const handleNewFrequencies = () => {
      // Mark any new frequencies
      const newItems: Record<string, boolean> = {};
      
      frequencies.forEach(freq => {
        if (freq.lastActivity) {
          const activityTime = new Date(freq.lastActivity).getTime();
          const now = new Date().getTime();
          const isRecent = now - activityTime < 60000; // Within the last minute
          
          if (isRecent) {
            newItems[freq.id] = true;
            
            // Clear the new indicator after 10 seconds
            setTimeout(() => {
              setShowNewIndicator(prev => {
                const updated = { ...prev };
                delete updated[freq.id];
                return updated;
              });
            }, 10000);
          }
        }
      });
      
      setShowNewIndicator(prev => ({ ...prev, ...newItems }));
    };
    
    handleNewFrequencies();
  }, [frequencies]);

  const sortFrequencies = (freqs: Frequency[], option: string): Frequency[] => {
    switch (option) {
      case 'distance':
        return [...freqs].sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      case 'activity':
        return [...freqs].sort((a, b) => {
          const activityOrder = { green: 0, yellow: 1, orange: 2, red: 3, none: 4 };
          return activityOrder[a.activityStatus] - activityOrder[b.activityStatus];
        });
      case 'frequency':
        return [...freqs].sort((a, b) => parseFloat(a.frequency) - parseFloat(b.frequency));
      default:
        return freqs;
    }
  };

  const hasMoreToLoad = filteredFrequencies.length > displayLimit;

  const loadMore = () => {
    setDisplayLimit(prev => prev + 12);
  };

  const displayedFrequencies = filteredFrequencies.slice(0, displayLimit);

  return (
    <div className="w-full animate-fade-in">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search frequencies, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2 items-center">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort by</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className={sortOption === 'distance' ? 'bg-accent text-accent-foreground' : ''}
              onClick={() => setSortOption('distance')}
            >
              By Distance
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortOption === 'activity' ? 'bg-accent text-accent-foreground' : ''}
              onClick={() => setSortOption('activity')}
            >
              By Activity
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortOption === 'frequency' ? 'bg-accent text-accent-foreground' : ''}
              onClick={() => setSortOption('frequency')}
            >
              By Frequency
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {filteredFrequencies.length === 0 ? (
        <div className="text-center py-10 glass-panel">
          <p className="text-muted-foreground">
            {loading ? 'Loading frequencies...' : 'No frequencies found.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedFrequencies.map((freq) => (
              <FrequencyItem 
                key={freq.id} 
                frequency={freq} 
                isNew={showNewIndicator[freq.id]}
                isFavorite={favorites.has(freq.id)}
                onToggleFavorite={() => onToggleFavorite(freq.id)}
              />
            ))}
          </div>
          
          {hasMoreToLoad && (
            <div className="flex justify-center mt-4">
              <Button 
                variant="secondary" 
                onClick={loadMore}
                className="flex items-center gap-2 px-8 group"
              >
                <span>Show more</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
