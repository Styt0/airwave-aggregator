
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Frequency, FrequencyCategory } from '@/lib/types';
import { categoryColors } from '@/lib/utils';
import { Map, MapPin } from 'lucide-react';

// Mapbox token provided by user
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3R5dG8iLCJhIjoiY204a2VtOXhkMHhqZTJrcXI5bjlyZjhsNSJ9.xeo91AG44Yz9q-zp7LEMrg';

interface MapViewProps {
  frequencies: Frequency[];
  userCoordinates: { latitude: number; longitude: number } | null;
  onSelectFrequency?: (id: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ 
  frequencies, 
  userCoordinates,
  onSelectFrequency 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const getCategoryColor = (category: FrequencyCategory): string => {
    const colorMap: Record<string, string> = {
      'Airband': '#ef4444',    // red-500
      'VHF': '#3b82f6',        // blue-500
      'UHF': '#8b5cf6',        // violet-500
      'Repeaters': '#10b981',  // emerald-500
      'CW': '#f59e0b',         // amber-500
      'HF': '#6366f1'          // indigo-500
    };
    
    return colorMap[category] || '#6b7280'; // gray-500 as default
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    const initialCoordinates = userCoordinates 
      ? [userCoordinates.longitude, userCoordinates.latitude] 
      : [4.3517, 50.8503]; // Default to Brussels
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Changed to dark style for NASA command hub look
      center: initialCoordinates as [number, number],
      zoom: userCoordinates ? 9 : 6,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      if (userMarker.current) userMarker.current.remove();
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Add markers for frequencies
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    frequencies.forEach(freq => {
      const { latitude, longitude } = freq.location.coordinates;
      
      // Create a custom element for the marker
      const el = document.createElement('div');
      el.className = 'flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer';
      el.style.backgroundColor = getCategoryColor(freq.category);
      
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2 bg-black bg-opacity-80 text-cyan-400 border border-cyan-500 rounded">
              <h3 class="font-bold">${freq.name}</h3>
              <p class="text-sm">${freq.frequency} MHz</p>
              <p class="text-xs text-cyan-300">${freq.category}</p>
            </div>
          `))
        .addTo(map.current);
      
      if (onSelectFrequency) {
        el.addEventListener('click', () => {
          onSelectFrequency(freq.id);
        });
      }
      
      markers.current.push(marker);
    });
  }, [frequencies, mapLoaded, onSelectFrequency]);

  // Add user location marker
  useEffect(() => {
    if (!map.current || !mapLoaded || !userCoordinates) return;
    
    if (userMarker.current) {
      userMarker.current.remove();
    }

    // Create a custom element for the user marker
    const el = document.createElement('div');
    el.className = 'flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 border-2 border-white shadow-lg pulse-animation';
    el.innerHTML = '<div class="w-4 h-4 bg-cyan-300 rounded-full animate-ping"></div>';
    
    userMarker.current = new mapboxgl.Marker({ element: el })
      .setLngLat([userCoordinates.longitude, userCoordinates.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<div class="p-2 bg-black bg-opacity-80 text-cyan-400 border border-cyan-500 rounded"><strong>Your Location</strong></div>'))
      .addTo(map.current);
    
    // Center the map on user's location
    map.current.flyTo({
      center: [userCoordinates.longitude, userCoordinates.latitude],
      zoom: 9,
      essential: true
    });
    
  }, [userCoordinates, mapLoaded]);

  if (!frequencies.length) {
    return (
      <div className="text-center py-8 border border-dashed rounded-xl">
        <Map className="w-10 h-10 mx-auto text-muted-foreground/50 mb-2" />
        <h3 className="text-lg font-medium text-muted-foreground">No frequencies to display</h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Add frequencies to see them on the map
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] rounded-lg overflow-hidden border animate-fade-in">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 bg-muted" 
      />
      <div className="absolute bottom-2 left-2 z-10 text-xs text-cyan-300 bg-black/80 px-2 py-1 rounded-md">
        Map data provided by Mapbox
      </div>
    </div>
  );
};


