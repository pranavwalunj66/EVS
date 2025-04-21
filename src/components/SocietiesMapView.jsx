import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
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

const SocietiesMapView = ({ societies, onBack, onSocietySelect }) => {
  const [selectedSociety, setSelectedSociety] = useState(null);

  useEffect(() => {
    // Initialize map centered on Delhi/NCR
    const map = L.map('societies-map').setView([28.55, 77.2], 11);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each society
    societies.forEach(society => {
      const [lat, lng] = generateCoordinates(society.address);
      const marker = L.marker([lat, lng]).addTo(map);

      // Create popup with society info
      const popupContent = `
        <div class="society-popup">
          <h3 class="font-bold text-lg">${society.societyName}</h3>
          <p class="text-sm">${society.address}</p>
          <p class="text-sm mt-2">${society.totalFamilies} Families</p>
          <button
            id="view-society-${society.id}"
            class="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-md"
          >
            View Details
          </button>
        </div>
      `;

      const popup = L.popup().setContent(popupContent);
      marker.bindPopup(popup);

      // Add event listener to the marker
      marker.on('click', () => {
        setSelectedSociety(society);
      });
    });

    // Add event listeners to the "View Details" buttons in popups
    map.on('popupopen', (e) => {
      societies.forEach(society => {
        const button = document.getElementById(`view-society-${society.id}`);
        if (button) {
          button.addEventListener('click', () => {
            onSocietySelect(society);
          });
        }
      });
    });

    // Cleanup function
    return () => {
      map.remove();
    };
  }, [societies, onSocietySelect]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background py-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="text-green-600 hover:text-green-700 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Societies
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Societies Map View</h2>
          <div id="societies-map" className="h-[600px] rounded-lg shadow-md"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocietiesMapView;
