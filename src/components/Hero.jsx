import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Hero = ({ isLoggedIn, isAdmin }) => {
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('user');
        //refresh the page to show the changes
        window.location.reload();
    };

    const navigate = useNavigate();
    return (
        <div className="relative overflow-hidden">
            <div className="bg-pattern mt-20 absolute inset-0" />

            {/* if user or admin in logged in then show Logout button on top right: */}
            <div className="absolute top-4 right-4 z-10">
                {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="text-green-600 hover:text-green-700 font-semibold text-lg"
                    >
                        Logout
                    </button>
                )}
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
                    >
                        {isLoggedIn && isAdmin ? (
                            <div className="rounded-md shadow">
                                <a
                                    href="#"
                                    onClick={() => navigate('/admin-dashboard')}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Go to Admin Dashboard
                                </a>
                            </div>
                        ) : isLoggedIn ? (
                            <div className="rounded-md shadow">
                                <a
                                    href="#"
                                    onClick={() => navigate('/user-dashboard')}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Go to Dashboard
                                </a>
                            </div>
                        ) : (
                            <>
                                <div className="rounded-md shadow mr-4">
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="rounded-md shadow">
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        Register Now
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
