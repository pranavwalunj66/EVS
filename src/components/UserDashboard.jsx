import React, { useState, useEffect } from 'react';
import Hero2 from './Hero2';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const UserDashboard = ({ user }) => {
    const [issues, setIssues] = useState([]);
    const [newIssue, setNewIssue] = useState({
        description: '',
        location: '',
        address: '',
        image: null,
    });

    useEffect(() => {
        // Fetch user's issues from the API
        const fetchIssues = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_URL + `/api/users/${user._id}/issues`
                );
                if (response.ok) {
                    const data = await response.json();
                    setIssues(data);
                } else {
                    console.error('Failed to fetch issues');
                }
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, [user._id]);

    const handleInputChange = (event) => {
        setNewIssue({ ...newIssue, [event.target.name]: event.target.value });
    };

    const handleImageChange = (event) => {
        setNewIssue({ ...newIssue, image: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle issue submission (API call)
        try {
            const formData = new FormData();
            formData.append('description', newIssue.description);
            formData.append('location', newIssue.location);
            formData.append('address', newIssue.address);
            formData.append('image', newIssue.image);

            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + `/api/users/${user._id}/issues`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (response.ok) {
                // Issue submitted successfully, update the issues list
                const data = await response.json();
                setIssues([...issues, data]);
                setNewIssue({ description: '', location: '', address: '', image: null });
            } else {
                console.error('Failed to submit issue');
            }
        } catch (error) {
            console.error('Error submitting issue:', error);
        }
    };

    return (
        <>
            <Hero2 />
            <div className="container mx-auto p-4">
                <h2 className="text-3xl font-bold text-primary mb-6">Welcome, {user.name}!</h2>

                {/* Issue Submission Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Report a New Issue</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="description" className="block">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={newIssue.description}
                                onChange={handleInputChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="location" className="block">
                                Location:
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={newIssue.location}
                                onChange={handleInputChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="address" className="block">
                                Address:
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={newIssue.address}
                                onChange={handleInputChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="image" className="block">
                                Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                        >
                            Submit Issue
                        </button>
                    </form>
                </div>

                {/* List of Issues */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-700">Your Issues</h3>
                    </div>
                    {issues.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {issues.map((issue) => (
                                <li
                                    key={issue._id}
                                    className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <div className="flex items-start">
                                        {/* Image on the left */}
                                        {issue.imageUrl && (
                                            <div className="mr-4">
                                                <img
                                                    src={
                                                        import.meta.env.VITE_BACKEND_URL +
                                                        issue.imageUrl
                                                    }
                                                    alt="Issue"
                                                    className="w-24 h-24 object-cover rounded-md shadow-sm"
                                                />
                                            </div>
                                        )}

                                        {/* Issue details on the right */}
                                        <div className="flex-1">
                                            <p className="text-gray-800">{issue.description}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Location: {issue.location}, {issue.address}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Reported on:{' '}
                                                {new Date(issue.createdAt).toLocaleDateString()}
                                            </p>

                                            {/* Status with Icon */}
                                            <div className="flex items-center mt-2">
                                                <span className="mr-2">Status:</span>
                                                {issue.status === 'pending' && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                        <FaClock className="mr-1" />
                                                        {issue.status}
                                                    </span>
                                                )}
                                                {issue.status === 'in process' && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                        <FaClock className="mr-1" />
                                                        {issue.status}
                                                    </span>
                                                )}
                                                {issue.status === 'resolved' && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                        <FaCheckCircle className="mr-1" />
                                                        {issue.status}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="px-6 py-4 text-gray-500">No issues reported yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};
export default UserDashboard;
