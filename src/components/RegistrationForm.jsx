import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const RegistrationForm = ({ onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    societyName: '',
    address: '',
    contactPerson: '',
    contactNumber: '',
    totalFamilies: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.societyName.trim()) newErrors.societyName = 'Society name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.totalFamilies) newErrors.totalFamilies = 'Total families is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Get existing societies from localStorage
      const existingSocieties = JSON.parse(localStorage.getItem('societies') || '[]');
      // Add new society
      const updatedSocieties = [...existingSocieties, { ...formData, id: Date.now() }];
      // Save to localStorage
      localStorage.setItem('societies', JSON.stringify(updatedSocieties));
      // Show success message
      setShowSuccess(true);
      // Call the onRegister callback after a delay
      setTimeout(() => {
        onRegister(formData);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>
        
        <h2 className="text-2xl font-bold text-primary mb-6">Register Your Society</h2>
        
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="text-green-600 text-xl font-semibold mb-2">Success!</div>
            <p className="text-gray-600">Your society has been registered successfully.</p>
            <p className="text-gray-600">You can view it in the Connected Societies section.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Society Name
              </label>
              <input
                type="text"
                name="societyName"
                value={formData.societyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.societyName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.societyName && (
                <p className="text-red-500 text-sm mt-1">{errors.societyName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.contactPerson && (
                <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Number of Families
              </label>
              <input
                type="number"
                name="totalFamilies"
                value={formData.totalFamilies}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border ${errors.totalFamilies ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.totalFamilies && (
                <p className="text-red-500 text-sm mt-1">{errors.totalFamilies}</p>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full btn-primary mt-6"
            >
              Register Society
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RegistrationForm; 