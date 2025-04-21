import { motion } from 'framer-motion';
import { FaArrowLeft, FaTrash, FaRecycle, FaLeaf } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
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

const generateMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(() => Math.floor(Math.random() * 500) + 200);
};

const generateWasteTypeData = () => {
  return {
    organic: Math.floor(Math.random() * 40) + 30,
    recyclable: Math.floor(Math.random() * 30) + 20,
    nonRecyclable: Math.floor(Math.random() * 20) + 10,
  };
};

const generateEfficiencyData = () => {
  return Array(12).fill(0).map(() => Math.floor(Math.random() * 20) + 70);
};

const NoDataMessage = () => (
  <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
    <p className="text-gray-500 text-lg">No data available yet</p>
  </div>
);

const SocietyDetails = ({ society, onBack }) => {
  // Check if this is a hardcoded society (has achievements)
  const isHardcodedSociety = society.achievements !== undefined;
  
  const monthlyData = isHardcodedSociety ? generateMonthlyData() : Array(12).fill(0);
  const wasteTypeData = isHardcodedSociety ? generateWasteTypeData() : { organic: 0, recyclable: 0, nonRecyclable: 0 };
  const efficiencyData = isHardcodedSociety ? generateEfficiencyData() : Array(12).fill(0);

  const monthlyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Waste Collection (kg)',
        data: monthlyData,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
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

  const totalWaste = monthlyData.reduce((a, b) => a + b, 0);
  const avgEfficiency = efficiencyData.reduce((a, b) => a + b, 0) / 12;
  const recyclingRate = isHardcodedSociety 
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
              <p className="text-2xl font-bold">{isHardcodedSociety ? `${totalWaste} kg` : '0 kg'}</p>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
            <div className="stat-card">
              <FaRecycle className="text-3xl text-blue-600 mb-2" />
              <h3 className="text-lg font-semibold">Recycling Rate</h3>
              <p className="text-2xl font-bold">{isHardcodedSociety ? `${recyclingRate.toFixed(1)}%` : '0%'}</p>
              <p className="text-sm text-gray-500">Current rate</p>
            </div>
            <div className="stat-card">
              <FaLeaf className="text-3xl text-green-600 mb-2" />
              <h3 className="text-lg font-semibold">Segregation Efficiency</h3>
              <p className="text-2xl font-bold">{isHardcodedSociety ? `${avgEfficiency.toFixed(1)}%` : '0%'}</p>
              <p className="text-sm text-gray-500">Average efficiency</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="chart-container">
              <h3 className="text-xl font-semibold mb-4">Monthly Waste Collection</h3>
              {isHardcodedSociety ? (
                <Bar data={monthlyChartData} options={{
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
            <div className="chart-container">
              <h3 className="text-xl font-semibold mb-4">Waste Composition</h3>
              {isHardcodedSociety ? (
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
              {isHardcodedSociety ? (
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

        <div className="bg-white rounded-lg shadow-lg p-6">
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
            {isHardcodedSociety && (
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">Achievements:</span> {society.achievements}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SocietyDetails; 