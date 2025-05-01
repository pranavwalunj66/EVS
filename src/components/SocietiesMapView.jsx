import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios'; // Import axios for API calls

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Fixed coordinates for specific societies for consistent display
const SOCIETY_COORDINATES = {
  "Aishwarayam Hamara": { lat: 18.6739, lng: 73.8245 },
  "River Residency": { lat: 18.6512, lng: 73.8424 },
  "Kamla Nivas": { lat: 23.0371, lng: 72.5492 },
  "Venture City": { lat: 18.6302, lng: 73.8547 },
  "Aasara Crystal Heights": { lat: 18.6588, lng: 73.8857 }
};

const SocietiesMapView = ({ societies, onBack, onSocietySelect }) => {
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize map centered on Pune
    const initializedMap = L.map('societies-map').setView([18.5204, 73.8567], 11);

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
    if (!map || !societies.length) return;

    // Function to fetch coordinates for a given society
    const fetchCoordinates = async (society) => {
      // First check if it's one of our specific societies
      if (SOCIETY_COORDINATES[society.societyName]) {
        return SOCIETY_COORDINATES[society.societyName];
      }

      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: society.address,
            format: 'json',
            limit: 1,
          },
        });

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          return { lat: parseFloat(lat), lng: parseFloat(lon) };
        } else {
          // Generate a deterministic random location within Pune if address not found
          const hash = CryptoJS.SHA256(society.societyName + society.address).toString(CryptoJS.enc.Hex);
          const randomLat = 18.4 + (parseInt(hash.substring(0, 4), 16) % 2000) / 10000; // Roughly between 18.4 and 18.6
          const randomLng = 73.8 + (parseInt(hash.substring(4, 8), 16) % 2000) / 10000; // Roughly between 73.8 and 74.0

          return { lat: randomLat, lng: randomLng };
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        
        // Fallback to deterministic coordinates
        const hash = CryptoJS.SHA256(society.societyName + society.address).toString(CryptoJS.enc.Hex);
        const randomLat = 18.4 + (parseInt(hash.substring(0, 4), 16) % 2000) / 10000;
        const randomLng = 73.8 + (parseInt(hash.substring(4, 8), 16) % 2000) / 10000;
        return { lat: randomLat, lng: randomLng };
      }
    };

    // Add markers for each society
    const addMarkers = async () => {
      for (const society of societies) {
        const coordinates = await fetchCoordinates(society);
        if (coordinates && coordinates.lat && coordinates.lng) {
          const marker = L.marker(coordinates).addTo(map);

          // Create popup with society info
          const popupContent = `
            <div class="society-popup">
              <h3 class="font-bold text-lg">${society.societyName}</h3>
              <p class="text-sm">${society.address}</p>
              <p class="text-sm mt-2">${society.totalFamilies} Families</p>
              <button
                id="view-society-${society._id}"
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
        }
      }

      // Add event listeners to the "View Details" buttons in popups
      map.on('popupopen', (e) => {
        societies.forEach(society => {
          const button = document.getElementById(`view-society-${society._id}`);
          if (button) {
            button.addEventListener('click', () => {
              onSocietySelect(society);
            });
          }
        });
      });
    };

    addMarkers();
  }, [map, societies, onSocietySelect]);

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