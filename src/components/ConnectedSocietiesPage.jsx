import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUser, FaPhone, FaUsers } from 'react-icons/fa';
import SocietyDetails from './SocietyDetails';

const SocietyCard = ({ society, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card cursor-pointer hover:shadow-md transition-shadow duration-200"
    onClick={() => onClick(society)}
  >
    <h3 className="text-xl font-semibold text-primary mb-4">{society.societyName}</h3>
    <div className="space-y-3">
      <div className="flex items-start space-x-3">
        <FaMapMarkerAlt className="text-secondary mt-1" />
        <p className="text-gray-600">{society.address}</p>
      </div>
      <div className="flex items-center space-x-3">
        <FaUser className="text-secondary" />
        <p className="text-gray-600">{society.contactPerson}</p>
      </div>
      <div className="flex items-center space-x-3">
        <FaPhone className="text-secondary" />
        <p className="text-gray-600">{society.contactNumber}</p>
      </div>
      <div className="flex items-center space-x-3">
        <FaUsers className="text-secondary" />
        <p className="text-gray-600">{society.totalFamilies} Families</p>
      </div>
    </div>
  </motion.div>
);

const ConnectedSocietiesPage = ({ onBack }) => {
  const [societies, setSocieties] = useState([]);
  const [selectedSociety, setSelectedSociety] = useState(null);

  // Hardcoded societies
  const hardcodedSocieties = [
    {
      id: 1,
      societyName: "Green Valley Society",
      address: "123 Green Valley Road, Sector 15, New Delhi",
      contactPerson: "Mr. Rajesh Kumar",
      contactNumber: "+91 98765 43210",
      totalFamilies: 120,
      achievements: "Best Waste Management Award 2023"
    },
    {
      id: 2,
      societyName: "Eco Park Residency",
      address: "456 Eco Park Avenue, Phase 2, Gurgaon",
      contactPerson: "Mrs. Priya Sharma",
      contactNumber: "+91 87654 32109",
      totalFamilies: 85,
      achievements: "100% Waste Segregation"
    },
    {
      id: 3,
      societyName: "Sunrise Heights",
      address: "789 Sunrise Boulevard, Block C, Mumbai",
      contactPerson: "Mr. Amit Patel",
      contactNumber: "+91 76543 21098",
      totalFamilies: 150,
      achievements: "Zero Waste to Landfill"
    },
    {
      id: 4,
      societyName: "Green Meadows",
      address: "321 Green Meadows Lane, Phase 3, Bangalore",
      contactPerson: "Ms. Sneha Reddy",
      contactNumber: "+91 65432 10987",
      totalFamilies: 95,
      achievements: "Best Composting Initiative"
    },
    {
      id: 5,
      societyName: "Nature's Nest",
      address: "654 Nature's Way, Sector 8, Pune",
      contactPerson: "Mr. Vikram Singh",
      contactNumber: "+91 54321 09876",
      totalFamilies: 110,
      achievements: "Innovative Recycling Program"
    }
  ];

  useEffect(() => {
    // Get societies from localStorage
    const storedSocieties = JSON.parse(localStorage.getItem('societies') || '[]');
    
    // Sort stored societies by ID in descending order (newest first)
    const sortedStoredSocieties = [...storedSocieties].sort((a, b) => b.id - a.id);
    
    // Combine sorted stored societies (at the top) with hardcoded societies
    const allSocieties = [...sortedStoredSocieties, ...hardcodedSocieties];
    setSocieties(allSocieties);
  }, []);

  const handleSocietyClick = (society) => {
    setSelectedSociety(society);
  };

  const handleBackToList = () => {
    setSelectedSociety(null);
  };

  if (selectedSociety) {
    return <SocietyDetails society={selectedSociety} onBack={handleBackToList} />;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="text-green-600 hover:text-green-700 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <h2 className="text-3xl font-bold text-center">Connected Societies</h2>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
        {societies.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No societies registered yet. Be the first to join!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societies.map((society) => (
              <SocietyCard 
                key={society.id} 
                society={society} 
                onClick={handleSocietyClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectedSocietiesPage; 