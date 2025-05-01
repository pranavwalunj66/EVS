import React from 'react';
import { FaYoutube, FaLink, FaNewspaper } from 'react-icons/fa';

const resources = [
    // YouTube Videos
    {
        id: 1,
        title: 'The Story of Stuff',
        type: 'video',
        category: 'waste-reduction',
        source: 'YouTube',
        url: 'https://www.youtube.com/watch?v=9GorqroigqM',
        thumbnail: 'https://img.youtube.com/vi/9GorqroigqM/maxresdefault.jpg',
        description:
            'An informative look at the lifecycle of products and the importance of reducing waste in our consumption-driven culture.',
    },
    {
        id: 2,
        title: '10 Ways to Start a Zero Waste Lifestyle | Sustainability for Beginners',
        type: 'video',
        category: 'waste-reduction',
        source: 'YouTube',
        url: 'https://www.youtube.com/watch?v=J77PRZk_pjk',
        thumbnail: 'https://img.youtube.com/vi/J77PRZk_pjk/maxresdefault.jpg',
        description:
            'Practical tips for beginning your zero waste journey and reducing waste in your daily life.',
    },
    {
        id: 3,
        title: 'HOW SWEDEN TURNS ITS WASTE INTO GOLD',
        type: 'video',
        category: 'waste-to-energy',
        source: 'YouTube',
        url: 'https://www.youtube.com/watch?v=p71xuG_dP7M',
        thumbnail: 'https://img.youtube.com/vi/p71xuG_dP7M/maxresdefault.jpg',
        description:
            'Learn how Sweden has revolutionized waste management by converting their trash into valuable energy resources.',
    },
    {
        id: 4,
        title: 'How Plastic Recycling Actually Works',
        type: 'video',
        category: 'recycling',
        source: 'YouTube',
        url: 'https://www.youtube.com/watch?v=zO3jFKiqmHo',
        thumbnail: 'https://img.youtube.com/vi/zO3jFKiqmHo/maxresdefault.jpg',
        description:
            'A detailed explanation of the plastic recycling process and its challenges in the real world.',
    },
    {
        id: 5,
        title: 'Composting for Beginners | The Dirt | Better Homes & Gardens',
        type: 'video',
        category: 'composting',
        source: 'YouTube',
        url: 'https://www.youtube.com/watch?v=bGRunDez1j4',
        thumbnail: 'https://img.youtube.com/vi/bGRunDez1j4/maxresdefault.jpg',
        description:
            'A step-by-step guide to starting your own composting system at home from Better Homes & Gardens.',
    },
    {
        id: 16,
        title: 'Circular Economy: definition & examples | Sustainability Environment',
        type: 'video',
        category: 'circular-economy',
        source: 'YouTube',
        url: 'https://www.youtube.com/watch?v=X6HDcubgxRk',
        thumbnail: 'https://img.youtube.com/vi/X6HDcubgxRk/maxresdefault.jpg',
        description:
            'An explanation of the circular economy model and its importance for sustainable waste management.',
    },

    // Websites & Articles
    {
        id: 6,
        title: 'EPA - Reducing and Reusing Basics',
        type: 'website',
        category: 'waste-reduction',
        source: 'EPA',
        url: 'https://www.epa.gov/recycle/reducing-and-reusing-basics',
        thumbnail:
            'https://www.epa.gov/sites/default/files/styles/large/public/2016-11/recycling_0.jpg',
        description:
            'Official EPA resources on reducing waste and reusing materials with tips and strategies for individuals and communities.',
    },
    {
        id: 7,
        title: 'Waste Management World',
        type: 'website',
        category: 'general',
        source: 'WMW',
        url: 'https://waste-management-world.com/',
        thumbnail:
            'https://waste-management-world.com/wp-content/uploads/sites/6/2022/01/AdobeStock_307963120-scaled.jpeg',
        description:
            'Leading industry publication providing news and information about waste management practices, innovations and technologies worldwide.',
    },
    {
        id: 8,
        title: 'Earth911 Recycling Guide',
        type: 'website',
        category: 'recycling',
        source: 'Earth911',
        url: 'https://earth911.com/recycling-center-search-guides/',
        thumbnail: 'https://earth911.com/wp-content/uploads/2015/01/recycling-bin-cans.jpg',
        description:
            'Comprehensive database with guides on how to recycle hundreds of different materials, plus a search tool to find local recycling options.',
    },
    {
        id: 9,
        title: 'WM Sustainability Hub',
        type: 'website',
        category: 'waste-management',
        source: 'WM',
        url: 'https://sustainability.wm.com/',
        thumbnail:
            'https://www.wm.com/content/dam/wm/assets/images/sustainability/sustainability-hero.jpg',
        description:
            "Resources and information from North America's largest environmental solutions provider on sustainable waste management practices.",
    },
    {
        id: 10,
        title: 'EPA Reducing Waste: What You Can Do',
        type: 'website',
        category: 'waste-reduction',
        source: 'EPA',
        url: 'https://www.epa.gov/recycle/reducing-waste-what-you-can-do',
        thumbnail: 'https://www.epa.gov/sites/default/files/styles/large/public/2016-11/trash.jpg',
        description:
            'Practical tips from the EPA on how individuals can reduce waste at home, school, work, in their communities, and while traveling.',
    },
    {
        id: 11,
        title: 'How to Set Up a Community Composting Program',
        type: 'article',
        category: 'composting',
        source: 'BioCycle',
        url: 'https://www.biocycle.net/community-composting-systems/',
        thumbnail:
            'https://www.biocycle.net/wp-content/uploads/2020/07/Compost-pile-with-thermometer-1030x687.jpg',
        description: 'A comprehensive guide to establishing a community composting program.',
    },
    {
        id: 12,
        title: 'The Ultimate Guide to Plastic Recycling Symbols',
        type: 'article',
        category: 'recycling',
        source: 'Treehugger',
        url: 'https://www.treehugger.com/plastic-recycling-symbols-meaning-4858651',
        thumbnail:
            'https://www.treehugger.com/thmb/iFIoFBxC3_7eIQIKxnPLgwrsGOE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/plastic-recycling-symbols-5c7d4a8646e0fb00017dcd3e.jpg',
        description: 'Learn what all those numbers and symbols on plastic products actually mean.',
    },
    {
        id: 13,
        title: 'Waste Audit Guide for Schools and Businesses',
        type: 'article',
        category: 'waste-management',
        source: 'CalRecycle',
        url: 'https://calrecycle.ca.gov/reducewaste/business/',
        thumbnail: 'https://calrecycle.ca.gov/images/calrecycle-logo.png',
        description:
            'Step-by-step instructions for conducting a waste audit in institutional settings.',
    },
    {
        id: 14,
        title: 'Hazardous Waste Disposal Guidelines',
        type: 'article',
        category: 'hazardous-waste',
        source: 'EPA',
        url: 'https://www.epa.gov/hw/household-hazardous-waste-hhw',
        thumbnail:
            'https://www.epa.gov/sites/default/files/styles/large/public/2017-12/hazardouswaste.jpg',
        description: 'EPA guidelines for safely disposing of hazardous household waste.',
    },
];

// Define styles for icons and text color
const typeStyles = {
    video: {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        Icon: FaYoutube,
        borderColor: 'border-green-600',
    },
    website: {
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        Icon: FaLink,
        borderColor: 'border-blue-600',
    },
    article: {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        Icon: FaNewspaper,
        borderColor: 'border-yellow-500',
    },
    default: {
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        Icon: () => null,
        borderColor: 'border-gray-300',
    },
};

const EducationalResources = () => {
    const getVideoId = (url) => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
                return urlObj.searchParams.get('v');
            } else if (urlObj.hostname === 'youtu.be') {
                return urlObj.pathname.slice(1);
            }
        } catch (error) {
            console.error('Error parsing video URL:', error);
        }
        return null;
    };

    return (
        <div className="pt-4 pb-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Educational Resources</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {resources.map((resource) => {
                        const style = typeStyles[resource.type] || typeStyles.default;
                        const { bgColor, textColor, Icon, borderColor } = style;
                        const borderClass = `border-t-4 ${borderColor}`;

                        // Get embed URL directly for videos (no autoplay)
                        const videoId = resource.type === 'video' ? getVideoId(resource.url) : null;
                        const embedUrl = videoId
                            ? `https://www.youtube.com/embed/${videoId}`
                            : null;

                        return (
                            <div
                                key={resource.id}
                                className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden ${bgColor} ${borderClass}`}
                            >
                                {resource.type === 'video' && embedUrl && (
                                    <div className="aspect-video w-full overflow-hidden bg-gray-300">
                                        <iframe
                                            src={embedUrl}
                                            title={resource.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                )}
                                <div className="p-4 flex flex-col flex-grow">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-lg font-semibold ${textColor} hover:opacity-80 mb-2 flex items-center`}
                                    >
                                        <Icon className="mr-2 flex-shrink-0" size={20} />
                                        <span className="flex-grow">{resource.title}</span>
                                    </a>
                                    <p className="text-sm text-gray-800 mb-3 flex-grow">
                                        {resource.description}
                                    </p>
                                    <div className="flex justify-end items-center text-xs text-gray-600 mt-auto">
                                        <span>Source: {resource.source}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EducationalResources;
