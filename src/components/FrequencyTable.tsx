
import React, { useEffect, useState } from 'react';
import { FrequencyItem } from './FrequencyItem';
import { AirportFrequencyItem } from './AirportFrequencyItem';
import { AprsItem } from './AprsItem';
import { Frequency } from '@/lib/types';
import { Radio, Search } from 'lucide-react';
import { Input } from './ui/input';

interface FrequencyTableProps {
  frequencies: Frequency[];
  loading: boolean;
  onToggleFavorite: (id: string) => void;
  favorites: Set<string>;
}

export const FrequencyTable: React.FC<FrequencyTableProps> = ({
  frequencies,
  loading,
  onToggleFavorite,
  favorites
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedFrequencies, setDisplayedFrequencies] = useState<Frequency[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  // Filter frequencies based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayedFrequencies(frequencies);
      return;
    }

    const normalizedTerm = searchTerm.toLowerCase().trim();
    const filtered = frequencies.filter(freq => 
      freq.name.toLowerCase().includes(normalizedTerm) ||
      freq.description.toLowerCase().includes(normalizedTerm) ||
      freq.frequency.toLowerCase().includes(normalizedTerm) ||
      freq.location.name.toLowerCase().includes(normalizedTerm) ||
      (freq.category && freq.category.toLowerCase().includes(normalizedTerm)) ||
      (freq.callsign && freq.callsign.toLowerCase().includes(normalizedTerm))
    );
    
    setDisplayedFrequencies(filtered);
    setPage(1); // Reset to first page when search changes
  }, [searchTerm, frequencies]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (page - 1) * itemsPerPage;
    return displayedFrequencies.slice(startIndex, startIndex + itemsPerPage);
  };

  // Pagination controls
  const totalPages = Math.ceil(displayedFrequencies.length / itemsPerPage);
  
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderFrequencyItem = (freq: Frequency) => {
    if (freq.category === 'Airport') {
      return (
        <AirportFrequencyItem
          key={freq.id}
          frequency={freq}
          isFavorite={favorites.has(freq.id)}
          onToggleFavorite={() => onToggleFavorite(freq.id)}
        />
      );
    } else if (freq.category === 'APRS') {
      return (
        <AprsItem
          key={freq.id}
          frequency={freq}
          isFavorite={favorites.has(freq.id)}
          onToggleFavorite={() => onToggleFavorite(freq.id)}
        />
      );
    } else {
      return (
        <FrequencyItem
          key={freq.id}
          frequency={freq}
          isFavorite={favorites.has(freq.id)}
          onToggleFavorite={() => onToggleFavorite(freq.id)}
        />
      );
    }
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block animate-spin mr-2">
          <Radio className="h-5 w-5 text-muted-foreground" />
        </div>
        <span className="text-muted-foreground">Loading frequencies...</span>
      </div>
    );
  }

  if (!loading && frequencies.length === 0) {
    return (
      <div className="text-center py-8">
        <Radio className="h-10 w-10 mx-auto text-muted-foreground opacity-20 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-1">
          No frequencies available
        </h3>
        <p className="text-sm text-muted-foreground">
          Try selecting a different category or add a new frequency.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search frequencies, locations or callsigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-card/60 backdrop-blur-sm"
        />
      </div>
      
      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {getCurrentPageItems().length} of {displayedFrequencies.length} frequencies
        {searchTerm && ` matching "${searchTerm}"`}
      </div>
      
      {/* Frequency list */}
      <div className="space-y-3">
        {getCurrentPageItems().map(freq => renderFrequencyItem(freq))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-3 py-1 rounded-md bg-card/60 border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md bg-card/60 border border-border text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
