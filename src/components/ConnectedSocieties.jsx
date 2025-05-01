import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaRecycle, FaLeaf } from 'react-icons/fa';

const societies = [
  {
    name: "Aishwarayam Hamara",
    location: "Mumbai, Maharashtra",
    wasteCollected: "5000 kg",
    recyclingRate: "85%"
  },
  {
    name: "Sunrise Apartments",
    location: "Delhi, NCR",
    wasteCollected: "3500 kg",
    recyclingRate: "78%"
  },
  {
    name: "Royal Heights",
    location: "Bangalore, Karnataka",
    wasteCollected: "4200 kg",
    recyclingRate: "92%"
  },
  {
    name: "Palm Gardens",
    location: "Chennai, Tamil Nadu",
    wasteCollected: "2800 kg",
    recyclingRate: "75%"
  }
];

const SocietyCard = ({ name, location, wasteCollected, recyclingRate }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="card"
  >
    <div className="flex items-start space-x-4">
      <FaMapMarkerAlt className="text-2xl text-primary mt-1" />
      <div>
        <h3 className="text-xl font-semibold text-primary">{name}</h3>
        <p className="text-gray-600 mb-4">{location}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaRecycle className="text-secondary mr-2" />
            <span>{wasteCollected}</span>
          </div>
          <div className="flex items-center">
            <FaLeaf className="text-secondary mr-2" />
            <span>{recyclingRate}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ConnectedSocieties = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Connected Societies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {societies.map((society, index) => (
            <SocietyCard key={index} {...society} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectedSocieties; 