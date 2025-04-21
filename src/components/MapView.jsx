import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Function to generate coordinates based on society address
// This is a simple hash function for demo purposes
const generateCoordinates = (address) => {
  // Generate a deterministic "random" latitude and longitude based on the address
  // This ensures the same address always gets the same coordinates
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate latitude between 28.4 and 28.7 (Delhi/NCR region)
  const lat = 28.4 + (Math.abs(hash % 1000) / 3000);

  // Generate longitude between 77.0 and 77.4 (Delhi/NCR region)
  const lng = 77.0 + (Math.abs((hash >> 10) % 1000) / 2500);

  return [lat, lng];
};

const MapView = ({ society }) => {
  useEffect(() => {
    // Generate coordinates based on society address
    const [lat, lng] = generateCoordinates(society.address);

    // Initialize map
    const map = L.map('map').setView([lat, lng], 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker for the society
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${society.societyName}</b><br>${society.address}`).openPopup();

    // Cleanup function
    return () => {
      map.remove();
    };
  }, [society]);

  return (
    <div id="map" className="h-80 rounded-lg shadow-md"></div>
  );
};

export default MapView;
