import { motion } from 'framer-motion';
import { FaArrowLeft, FaTrash, FaRecycle, FaLeaf, FaMapMarkedAlt, FaCalendarAlt } from 'react-icons/fa';
import MapView from './MapView';
import ScheduleCalendar from './ScheduleCalendar';
import { Line, Bar, Pie } from 'react-chartjs-2';
import CryptoJS from 'crypto-js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// List of specific societies we want to generate deterministic data for
const SPECIFIC_SOCIETIES = [
  "Aishwarayam Hamara",
  "River Residency",
  "Kamla Nivas",
  "Venture City",
  "Aasara Crystal Heights"
];

// Achievements for specific societies
const SOCIETY_ACHIEVEMENTS = {
  "Aishwarayam Hamara": "Best Waste Management Award 2023, 95% Segregation Rate",
  "River Residency": "Zero Waste to Landfill Initiative, Community Composting Leader",
  "Kamla Nivas": "Waste Reduction Champion 2024, Innovative Recycling Program",
  "Venture City": "Green Society Award, 100% Organic Waste Composting",
  "Aasara Crystal Heights": "Sustainable Community Award, Plastic-Free Initiative"
};

// Function to generate deterministic random number based on seed
const generateHashBasedNumber = (seed, min, max) => {
  const hash = CryptoJS.SHA256(seed).toString(CryptoJS.enc.Hex);
  const value = parseInt(hash.substring(0, 8), 16);
  return min + (value % (max - min + 1));
};

// Generate monthly data with consistent values based on society name
const generateMonthlyData = (societyName) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((month, index) => {
    const seed = `${societyName}-${month}-monthly`;
    return generateHashBasedNumber(seed, 200, 700);
  });
};

// Generate waste type distribution with consistent values based on society name
const generateWasteTypeData = (societyName) => {
  return {
    organic: generateHashBasedNumber(`${societyName}-organic-waste`, 30, 70),
    recyclable: generateHashBasedNumber(`${societyName}-recyclable-waste`, 20, 50),
    nonRecyclable: generateHashBasedNumber(`${societyName}-nonrecyclable-waste`, 10, 30),
  };
};

// Generate efficiency data with consistent values based on society name
const generateEfficiencyData = (societyName) => {
  return Array(12).fill(0).map((_, index) => {
    const seed = `${societyName}-efficiency-${index}`;
    return generateHashBasedNumber(seed, 70, 95);
  });
};

const NoDataMessage = () => (
  <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
    <p className="text-gray-500 text-lg">No data available yet</p>
  </div>
);

const SocietyDetails = ({ society, onBack }) => {
  // Check if this is one of our specific societies
  const isSpecificSociety = SPECIFIC_SOCIETIES.includes(society.societyName);
  
  // Generate data for each waste type based on society name
  const generateMonthlyDataForType = (societyName, type) => {
    return Array(12).fill(0).map((_, index) => {
      const seed = `${societyName}-${type}-month-${index}`;
      return generateHashBasedNumber(seed, 100, 300);
    });
  };

  // Get society data based on whether it's a specific society
  const monthlyData = isSpecificSociety ? {
    organic: generateMonthlyDataForType(society.societyName, 'organic'),
    recyclable: generateMonthlyDataForType(society.societyName, 'recyclable'),
    nonRecyclable: generateMonthlyDataForType(society.societyName, 'nonRecyclable')
  } : {
    organic: Array(12).fill(0),
    recyclable: Array(12).fill(0),
    nonRecyclable: Array(12).fill(0)
  };

  const wasteTypeData = isSpecificSociety ? generateWasteTypeData(society.societyName) : { organic: 0, recyclable: 0, nonRecyclable: 0 };
  const efficiencyData = isSpecificSociety ? generateEfficiencyData(society.societyName) : Array(12).fill(0);

  // Add achievements to the society object if it's one of our specific societies
  const societyAchievement = isSpecificSociety ? SOCIETY_ACHIEVEMENTS[society.societyName] : null;

  const monthlyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Organic Waste',
        data: monthlyData.organic,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        stack: 'Stack 0',
      },
      {
        label: 'Recyclable Waste',
        data: monthlyData.recyclable,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        stack: 'Stack 0',
      },
      {
        label: 'Non-Recyclable Waste',
        data: monthlyData.nonRecyclable,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        stack: 'Stack 0',
      },
    ],
  };

  const wasteTypeChartData = {
    labels: ['Organic', 'Recyclable', 'Non-Recyclable'],
    datasets: [
      {
        data: [wasteTypeData.organic, wasteTypeData.recyclable, wasteTypeData.nonRecyclable],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const efficiencyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Segregation Efficiency (%)',
        data: efficiencyData,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      },
    ],
  };

  const totalWaste = monthlyData.organic.reduce((a, b) => a + b, 0) +
                    monthlyData.recyclable.reduce((a, b) => a + b, 0) +
                    monthlyData.nonRecyclable.reduce((a, b) => a + b, 0);
  const avgEfficiency = efficiencyData.reduce((a, b) => a + b, 0) / 12;
  const recyclingRate = isSpecificSociety
    ? (wasteTypeData.recyclable / (wasteTypeData.organic + wasteTypeData.recyclable + wasteTypeData.nonRecyclable)) * 100
    : 0;

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
          <h2 className="text-3xl font-bold text-primary mb-4">{society.societyName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat-card">
              <FaTrash className="text-3xl text-green-600 mb-2" />
              <h3 className="text-lg font-semibold">Total Waste</h3>
              <p className="text-2xl font-bold">{isSpecificSociety ? `${totalWaste} kg` : '0 kg'}</p>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
            <div className="stat-card">
              <FaRecycle className="text-3xl text-blue-600 mb-2" />
              <h3 className="text-lg font-semibold">Recycling Rate</h3>
              <p className="text-2xl font-bold">{isSpecificSociety ? `${recyclingRate.toFixed(1)}%` : '0%'}</p>
              <p className="text-sm text-gray-500">Current rate</p>
            </div>
            <div className="stat-card">
              <FaLeaf className="text-3xl text-green-600 mb-2" />
              <h3 className="text-lg font-semibold">Segregation Efficiency</h3>
              <p className="text-2xl font-bold">{isSpecificSociety ? `${avgEfficiency.toFixed(1)}%` : '0%'}</p>
              <p className="text-sm text-gray-500">Average efficiency</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="chart-container">
              <h3 className="text-xl font-semibold mb-4">Monthly Waste Collection</h3>
              {isSpecificSociety ? (
                <Bar data={monthlyChartData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                    }
                  }
                }} />
              ) : (
                <NoDataMessage />
              )}
            </div>
            <div className="chart-container">
              <h3 className="text-xl font-semibold mb-4">Waste Composition</h3>
              {isSpecificSociety ? (
                <Pie data={wasteTypeChartData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }} />
              ) : (
                <NoDataMessage />
              )}
            </div>
            <div className="chart-container lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Segregation Efficiency Trend</h3>
              {isSpecificSociety ? (
                <Line data={efficiencyChartData} options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      min: 0,
                      max: 100,
                    },
                  },
                }} />
              ) : (
                <NoDataMessage />
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Society Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Address:</span> {society.address}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Contact Person:</span> {society.contactPerson}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Contact Number:</span> {society.contactNumber}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Total Families:</span> {society.totalFamilies}
              </p>
            </div>
            {societyAchievement && (
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Achievements:</span> {societyAchievement}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <FaMapMarkedAlt className="text-xl text-green-600 mr-2" />
            <h3 className="text-xl font-semibold">Society Location</h3>
          </div>
          <MapView society={society} />
        </div>

        <ScheduleCalendar societyId={society._id} societyName={society.societyName} />
      </div>
    </motion.div>
  );
};

export default SocietyDetails;