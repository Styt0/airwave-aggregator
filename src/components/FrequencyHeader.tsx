
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AudioWaveform, RadioTower } from 'lucide-react';

const FrequencyHeader = () => {
  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="relative">
          <RadioTower className="h-16 w-16 text-primary radar-ping" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 opacity-30 animate-pulse rounded-full bg-primary/20"></div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-12 opacity-20 animate-pulse rounded-full bg-primary/10" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 opacity-10 animate-pulse rounded-full bg-primary/5" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      <header className="text-center">
        <div className="flex justify-end mb-2">
          <Link to="/signal-identification">
            <Button variant="outline" className="flex items-center gap-2">
              <AudioWaveform className="h-4 w-4" />
              Signal Identification
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl animate-fade-in">
          Radio Frequency Database
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
          Browse radio frequencies sorted by location relevance and real-time activity
        </p>
      </header>
    </>
  );
};

export default FrequencyHeader;
