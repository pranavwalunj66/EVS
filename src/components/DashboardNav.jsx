import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaLightbulb, FaRecycle } from 'react-icons/fa';

const DashboardNav = ({ onNavigate }) => {
  const navItems = [
    {
      title: 'Metrics & Analytics',
      icon: <FaChartLine className="text-2xl" />,
      description: 'View detailed waste management metrics and analytics',
      page: 'metrics'
    },
    {
      title: 'Connected Societies',
      icon: <FaUsers className="text-2xl" />,
      description: 'Browse all registered societies and their details',
      page: 'societies'
    },
    {
      title: 'Success Stories',
      icon: <FaLightbulb className="text-2xl" />,
      description: 'Learn from successful waste management implementations',
      page: 'stories'
    },
    {
      title: 'Process Guide',
      icon: <FaRecycle className="text-2xl" />,
      description: 'Step-by-step guide for waste management process',
      page: 'process'
    }
  ];

  return (
    <div className="pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navItems.map((item) => (
            <motion.button
              key={item.page}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.page)}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
            >
              <div className="text-green-600 mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardNav; 