
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Frequency, FrequencyCategory } from '@/lib/types';
import { categoryColors } from '@/lib/utils';
import { Map, MapPin } from 'lucide-react';

// You'll need to replace this with your own Mapbox token
// For a production app, this should be stored securely
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNsMjl4ZWt4bTAwdGkzZG5wYjJ0aXg1NW0ifQ.Dq8j2hFbhZIzxcKdYmQP3Q';

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
      style: 'mapbox://styles/mapbox/light-v11',
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
            <div class="p-2">
              <h3 class="font-bold">${freq.name}</h3>
              <p class="text-sm">${freq.frequency} MHz</p>
              <p class="text-xs text-gray-500">${freq.category}</p>
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
    el.className = 'flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-md pulse-animation';
    
    userMarker.current = new mapboxgl.Marker({ element: el })
      .setLngLat([userCoordinates.longitude, userCoordinates.latitude])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<div class="p-2"><strong>Your Location</strong></div>'))
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
      {!MAPBOX_TOKEN.startsWith('pk.eyJ1IjoiZGVtby1hY2NvdW50') && (
        <div className="absolute bottom-2 left-2 z-10 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md">
          Map data provided by Mapbox
        </div>
      )}
      {MAPBOX_TOKEN.startsWith('pk.eyJ1IjoiZGVtby1hY2NvdW50') && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/80 z-10">
          <div className="bg-background p-4 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-semibold mb-2">Mapbox API Key Required</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This demo is using a placeholder Mapbox token. For a working map, replace the token in MapView.tsx with your own Mapbox access token.
            </p>
            <a 
              href="https://account.mapbox.com/auth/signup/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Get a free Mapbox account →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

