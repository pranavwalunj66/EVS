import CryptoJS from 'crypto-js';
import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for Leaflet's default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ society }) => {
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null); // Create a ref for the map container

  useEffect(() => {
    if (!mapContainerRef.current) return; // Ensure the container exists

    const initializedMap = L.map('map').setView([18.5204, 73.8567], 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(initializedMap);

    setMap(initializedMap);

    return () => {
      initializedMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Function to fetch coordinates for a given address
    const fetchCoordinates = async (address) => {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: address,
            format: 'json',
            limit: 1,
          },
        });

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          return { lat: parseFloat(lat), lng: parseFloat(lon) };
        } else {
          // Generate a deterministic random location within Pune if address not found
          const hash = CryptoJS.SHA256(address).toString(CryptoJS.enc.Hex);
          const randomLat = 18.4 + (parseInt(hash.substring(0, 4), 16) % 2000) / 10000; // Roughly between 18.4 and 18.6
          const randomLng = 73.8 + (parseInt(hash.substring(4, 8), 16) % 2000) / 10000; // Roughly between 73.8 and 74.0

          return { lat: randomLat, lng: randomLng };
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
      return null;
    };

    // Add marker for the society
    const addMarker = async () => {
      const coordinates = await fetchCoordinates(society.societyName + ' ' + society.address);
      if (coordinates && coordinates.lat && coordinates.lng) {
        const marker = L.marker(coordinates).addTo(map);
        marker.bindPopup(`<b>${society.societyName}</b><br>${society.address}`);
        map.setView(coordinates, 15); // Set the view to the marker's location with zoom level 15
      }
    };

    addMarker();
  }, [map, society]);

  return (
    <div>
      <div id="map" className="h-80 rounded-lg shadow-md" ref={mapContainerRef}></div>
    </div>
  );
}

export default MapView;
