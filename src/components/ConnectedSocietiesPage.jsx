import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUser, FaPhone, FaUsers, FaMap } from 'react-icons/fa';
import SocietyDetails from './SocietyDetails';
import SocietiesMapView from './SocietiesMapView';

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

const ConnectedSocietiesPage = () => {
    const [societies, setSocieties] = useState([]);
    const [selectedSociety, setSelectedSociety] = useState(null);
    const [showMapView, setShowMapView] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/societies');
                if (!response.ok) {
                    throw new Error('Failed to fetch societies');
                }
                const data = await response.json();
                setSocieties(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSocieties();
    }, []);

    const handleSocietyClick = (society) => {
        setSelectedSociety(society);
    };

    const handleBackToList = () => {
        setSelectedSociety(null);
        setShowMapView(false);
    };

    const handleShowMapView = () => {
        setShowMapView(true);
    };

    if (selectedSociety) {
        return <SocietyDetails society={selectedSociety} onBack={handleBackToList} />;
    }

    if (showMapView) {
        return (
            <SocietiesMapView
                societies={societies}
                onBack={handleBackToList}
                onSocietySelect={handleSocietyClick}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Connected Societies</h2>
                    <button
                        onClick={handleShowMapView}
                        className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                    >
                        <FaMap className="mr-2" /> View Map
                    </button>
                </div>
                {loading ? (
                    <p>Loading societies...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : selectedSociety ? (
                    <SocietyDetails society={selectedSociety} onBack={handleBackToList} />
                ) : showMapView ? (
                    <SocietiesMapView
                        societies={societies}
                        onBack={handleBackToList}
                        onSocietySelect={handleSocietyClick}
                    />
                ) : societies.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No societies registered yet. Be the first to join!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {societies.map((society) => (
                            <SocietyCard
                                key={society._id}
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
