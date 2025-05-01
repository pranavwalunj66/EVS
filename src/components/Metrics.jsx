import { motion } from 'framer-motion';
import { FaRecycle, FaLeaf, FaTree, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const metrics = [
    {
        title: 'Total Waste Collected',
        total: '15,000',
        monthly: '2,500',
        unit: 'kg',
        icon: FaRecycle,
    },
    {
        title: 'Plastic Recycled',
        total: '5,000',
        monthly: '800',
        unit: 'kg',
        icon: FaRecycle,
    },
    {
        title: 'Metal Recycled',
        total: '3,000',
        monthly: '500',
        unit: 'kg',
        icon: FaRecycle,
    },
    {
        title: 'Glass Recycled',
        total: '2,000',
        monthly: '300',
        unit: 'kg',
        icon: FaRecycle,
    },
    {
        title: 'Compost Produced',
        total: '5,000',
        monthly: '900',
        unit: 'kg',
        icon: FaLeaf,
    },
    {
        title: 'Carbon Footprint Reduction',
        total: '12.5',
        monthly: '2.1',
        unit: 'tons CO2',
        icon: FaTree,
    },
];

const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Waste Collected (kg)',
            data: [2000, 2500, 3000, 2800, 3500, 4000],
            borderColor: '#4CAF50',
            tension: 0.4,
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Waste Collection Trend',
        },
    },
};

const MetricCard = ({ title, total, monthly, unit, icon: Icon }) => (
    <motion.div whileHover={{ scale: 1.05 }} className="metric-card">
        <Icon className="text-4xl text-primary" />
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <div className="space-y-2">
            <div className="text-center">
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-2xl font-bold text-primary">
                    {total} <span className="text-sm">{unit}</span>
                </div>
            </div>
            <div className="text-center">
                <div className="text-sm text-gray-500">Last Month</div>
                <div className="text-xl font-semibold text-secondary">
                    {monthly} <span className="text-sm">{unit}</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const Metrics = () => {
    return (
        <div className="py-8 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {metrics.map((metric, index) => (
                    <MetricCard key={index} {...metric} />
                ))}
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Metrics;
