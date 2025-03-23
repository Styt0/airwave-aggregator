
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioTower, AudioWaveform, Search, History, Database } from 'lucide-react';
import { SignalType, findSignalTypesByFrequency, findSignalTypesByName } from '@/lib/utils';

const SignalIdentification: React.FC = () => {
  const [frequencySearch, setFrequencySearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SignalType[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const handleFrequencySearch = () => {
    const freqValue = parseFloat(frequencySearch);
    if (!isNaN(freqValue)) {
      const results = findSignalTypesByFrequency(freqValue);
      setSearchResults(results);
      addToSearchHistory(`${freqValue} MHz`);
    }
  };
  
  const handleNameSearch = () => {
    if (nameSearch.trim()) {
      const results = findSignalTypesByName(nameSearch);
      setSearchResults(results);
      addToSearchHistory(nameSearch);
    }
  };
  
  const addToSearchHistory = (term: string) => {
    setSearchHistory(prev => {
      // Add to beginning and limit to 10 items
      const newHistory = [term, ...prev.filter(item => item !== term)];
      return newHistory.slice(0, 10);
    });
  };
  
  const handleHistoryClick = (term: string) => {
    if (term.includes('MHz')) {
      setFrequencySearch(term.replace(' MHz', ''));
      handleFrequencySearch();
    } else {
      setNameSearch(term);
      handleNameSearch();
    }
  };

  return (
    <Card className="w-full bg-card/80 backdrop-blur-md shadow-md border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <AudioWaveform className="h-5 w-5 mr-2 text-primary" />
            Signal Identification
          </CardTitle>
        </div>
        <CardDescription>
          Identify common radio signals based on frequency or characteristics
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="frequency" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="frequency" className="flex items-center gap-1">
              <RadioTower className="h-4 w-4" />
              By Frequency
            </TabsTrigger>
            <TabsTrigger value="name" className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              By Name/Type
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="frequency" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Enter frequency in MHz"
                value={frequencySearch}
                onChange={(e) => setFrequencySearch(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleFrequencySearch}>Search</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="name" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search by signal name, modulation or description"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleNameSearch}>Search</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <History className="h-3 w-3 mr-1" />
              Recent Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((term, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => handleHistoryClick(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Search Results */}
        <div className="mt-6">
          <div className="flex items-center text-sm font-medium mb-3">
            <Database className="h-4 w-4 mr-1" />
            Results ({searchResults.length})
          </div>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No signal types found. Try another search.</p>
              <p className="text-xs mt-2">
                Data source: ARES Valley Signal Identification Database
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((signal, index) => (
                <Card key={index} className="overflow-hidden border border-border/40 hover:border-border/80 transition-all">
                  <div className="flex flex-col h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{signal.name}</CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {signal.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Frequency:</span>
                          <span className="font-mono">{signal.frequencyRange}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Modulation:</span>
                          <span className="font-mono">{signal.modulation}</span>
                        </div>
                        <div className="flex flex-col mt-1">
                          <span className="text-muted-foreground">Bandwidth:</span>
                          <span className="font-mono">{signal.bandwidth}</span>
                        </div>
                        <div className="flex flex-col mt-1">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="font-mono">{signal.category}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 text-[10px] text-muted-foreground">
                      Source: {signal.source}
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalIdentification;
