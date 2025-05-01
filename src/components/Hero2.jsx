import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Hero2 = () => {
    const navigate = useNavigate();
    return (
        <div className="relative overflow-hidden">
            <div className="bg-pattern mt-20 absolute inset-0" />

            {/* Back to homepage */}
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={() => navigate('/')}
                    className="text-green-600 hover:text-green-700 font-semibold text-lg"
                >
                    ← Back to Homepage
                </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 text-green-500 opacity-10">
                <FaLeaf className="w-full h-full" />
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 text-green-500 opacity-10">
                <FaRecycle className="w-full h-full" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                    >
                        <span className="block">Transform Your Society's</span>
                        <span className="block text-green-600">Waste Management</span>
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
                    >
                        Solid Waste Management System
                    </motion.h2>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero2;
