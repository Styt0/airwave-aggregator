
import React, { createContext, useContext, useState } from 'react';

interface MapContextProps {
  selectedLocation: {
    latitude: number;
    longitude: number;
    locationName: string;
  } | null;
  setSelectedLocation: (location: { latitude: number; longitude: number; locationName: string; } | null) => void;
}

const MapContext = createContext<MapContextProps>({
  selectedLocation: null,
  setSelectedLocation: () => {},
});

export const useMapContext = () => useContext(MapContext);

interface MapProviderProps {
  children: React.ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    locationName: string;
  } | null>(null);

  return (
    <MapContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </MapContext.Provider>
  );
};
