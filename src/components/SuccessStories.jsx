import { motion } from 'framer-motion';
import { FaQuoteLeft, FaTrophy } from 'react-icons/fa';

const stories = [
    {
        society: 'Green Valley Society',
        testimonial:
            "Their waste management system has transformed our society. We're proud to be part of this environmental initiative.",
        achievement: '50% reduction in waste sent to landfills',
    },
    {
        society: 'Sunrise Apartments',
        testimonial:
            'The composting program has been a huge success. Our garden has never looked better!',
        achievement: '1000kg of compost produced monthly',
    },
    {
        society: 'Royal Heights',
        testimonial: 'Professional service and excellent waste segregation. Highly recommended!',
        achievement: '90% waste recycling rate achieved',
    },
];

const StoryCard = ({ society, testimonial, achievement }) => (
    <motion.div whileHover={{ scale: 1.02 }} className="card max-w-md mx-auto">
        <div className="flex items-start space-x-4">
            <FaQuoteLeft className="text-3xl text-primary mt-1" />
            <div>
                <h3 className="text-xl font-semibold text-primary mb-2">{society}</h3>
                <p className="text-gray-600 mb-4">{testimonial}</p>
                <div className="flex items-center text-secondary">
                    <FaTrophy className="mr-2" />
                    <span className="font-medium">{achievement}</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const SuccessStories = () => {
    return (
        <div className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <StoryCard key={index} {...story} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
