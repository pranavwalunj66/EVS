import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaTruck, FaIndustry, FaCheckCircle, FaHandshake } from 'react-icons/fa';

const ProcessStep = ({ icon: Icon, title, description, details, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <div className="flex items-start space-x-4">
      <div className="text-green-600 text-2xl">
        <Icon />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {details.map((detail, i) => (
            <li key={i} className="flex items-start space-x-2 text-sm text-gray-600">
              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const ProcessVisualization = () => {
  const processSteps = [
    {
      icon: FaLeaf,
      title: "Waste Segregation",
      description: "Proper separation of waste at the source",
      details: [
        "Separate dry and wet waste",
        "Segregate recyclables (paper, plastic, metal)",
        "Keep hazardous waste separate",
        "Use color-coded bins for different types",
        "Train residents on proper segregation"
      ]
    },
    {
      icon: FaTruck,
      title: "Collection & Transportation",
      description: "Efficient collection and transport of segregated waste",
      details: [
        "Schedule regular collection times",
        "Use appropriate vehicles for different waste types",
        "Maintain collection routes and schedules",
        "Ensure proper handling during transport",
        "Track collection efficiency"
      ]
    },
    {
      icon: FaIndustry,
      title: "Processing & Treatment",
      description: "Scientific processing of different waste types",
      details: [
        "Compost organic waste",
        "Recycle paper, plastic, and metal",
        "Treat hazardous waste safely",
        "Convert waste to energy where possible",
        "Monitor processing efficiency"
      ]
    },
    {
      icon: FaRecycle,
      title: "Recycling & Recovery",
      description: "Maximizing resource recovery from waste",
      details: [
        "Process recyclables into new products",
        "Recover valuable materials",
        "Create compost from organic waste",
        "Generate energy from waste",
        "Track recycling rates"
      ]
    },
    {
      icon: FaHandshake,
      title: "Disposal & Monitoring",
      description: "Safe disposal of residual waste and continuous monitoring",
      details: [
        "Dispose of non-recyclable waste safely",
        "Monitor landfill operations",
        "Track environmental impact",
        "Maintain compliance records",
        "Regular performance audits"
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Waste Management Process Guide</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive guide to implementing effective waste management in your society.
            Follow these steps to ensure proper waste handling and environmental sustainability.
          </p>
        </div>

        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <ProcessStep key={index} {...step} index={index} />
          ))}
        </div>

        <div className="mt-12 bg-green-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Residents</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Follow proper waste segregation guidelines</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Use designated bins for different waste types</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Participate in community cleanup drives</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Report any issues to the management</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Management</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Regular maintenance of collection systems</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Conduct regular awareness programs</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Monitor and optimize collection routes</span>
                </li>
                <li className="flex items-start space-x-2 text-gray-600">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Maintain proper documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessVisualization; 