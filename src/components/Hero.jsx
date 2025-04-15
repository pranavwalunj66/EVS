import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern"></div>
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-primary opacity-10">
        <FaLeaf className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 right-20 text-primary opacity-10">
        <FaRecycle className="w-32 h-32" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-16"
      >
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-primary mb-4"
          >
            Transforming Waste into Resources
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl font-semibold text-secondary mb-8"
          >
            Solid Waste Management System
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-xl shadow-lg hover:shadow-xl"
          >
            Register Your Society
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 