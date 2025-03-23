
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Radio, RadioTower, ArrowLeft, AudioWaveform, Database as DatabaseIcon } from 'lucide-react';
import SignalIdentification from '@/components/SignalIdentification';

const SignalIdentificationPage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8">
        <div className="flex flex-col space-y-6">
          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Frequencies
              </Button>
            </Link>
          </div>
          
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl flex items-center justify-center gap-2 animate-fade-in">
              <RadioTower className="h-8 w-8 text-primary" />
              Signal Identification
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Identify radio signals by frequency or characteristics using the ARES Valley database
            </p>
          </header>
          
          {/* Signal Identification Component */}
          <div className="w-full mt-6">
            <SignalIdentification />
          </div>
          
          {/* Information Section */}
          <div className="w-full mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg border border-border/50 shadow-sm flex flex-col items-center text-center">
                <Radio className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-medium">Frequency Search</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Search signals by entering a specific frequency in MHz to find matching signal types.
                </p>
              </div>
              
              <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg border border-border/50 shadow-sm flex flex-col items-center text-center">
                <AudioWaveform className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-medium">Spectrum Analysis</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Identify signals by their spectral characteristics including modulation type and bandwidth.
                </p>
              </div>
              
              <div className="bg-card/80 backdrop-blur-md p-6 rounded-lg border border-border/50 shadow-sm flex flex-col items-center text-center">
                <DatabaseIcon className="h-8 w-8 text-primary mb-3" />
                <h3 className="text-lg font-medium">Signal Database</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Access comprehensive information about common radio signals from the ARES Valley database.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="text-center text-sm text-muted-foreground mt-8">
            <p>Signal data sourced from <a href="https://www.aresvalley.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ARES Valley</a> signal identification database</p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default SignalIdentificationPage;
