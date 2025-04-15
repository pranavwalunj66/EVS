import { motion } from 'framer-motion';
import { FaTruck, FaSort, FaRecycle, FaLeaf } from 'react-icons/fa';

const steps = [
  {
    icon: FaTruck,
    title: "Collection",
    description: "We collect waste from your society at scheduled times"
  },
  {
    icon: FaSort,
    title: "Segregation",
    description: "Waste is carefully segregated into different categories"
  },
  {
    icon: FaRecycle,
    title: "Recycling",
    description: "Non-biodegradable waste is processed for recycling"
  },
  {
    icon: FaLeaf,
    title: "Composting",
    description: "Organic waste is converted into nutrient-rich compost"
  }
];

const ProcessStep = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="flex flex-col items-center text-center"
  >
    <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
      <Icon className="text-3xl text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    <p className="text-gray-600 max-w-xs">{description}</p>
  </motion.div>
);

const ProcessVisualization = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ProcessStep key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessVisualization; 