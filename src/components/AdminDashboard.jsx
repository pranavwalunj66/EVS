import React, { useState, useEffect } from 'react';
import Hero2 from './Hero2';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        // Fetch all issues from the API
        const fetchIssues = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/issues');
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
    }, []);

    const handleStatusChange = async (issueId, newStatus) => {
        // Update issue status via API
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + `/api/issues/${issueId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (response.ok) {
                // Update the issues list
                setIssues(
                    issues.map((issue) =>
                        issue._id === issueId ? { ...issue, status: newStatus } : issue
                    )
                );
            } else {
                console.error('Failed to update issue status');
            }
        } catch (error) {
            console.error('Error updating issue status:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Hero2 />
            <h2 className="text-3xl font-bold text-primary mb-6">Admin Dashboard</h2>

            {/* List of Issues */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700">All Issues</h3>
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
                                        <p className="text-sm text-gray-500">{issue.user.name}</p>
                                        <p className="text-gray-800">{issue.description}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Location: {issue.location}, {issue.address}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Reported on:{' '}
                                            {new Date(issue.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Contact: {issue.user.contactNumber || '1234567890'}
                                        </p>
                                        <p className="test-sm text-gray-500 mt-1">
                                            Email: {issue.user.email || 'abc@gmail.com'}
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

                                        {/* Action Buttons */}
                                        <div className="mt-3 flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(issue._id, 'pending')
                                                }
                                                className={`px-3 py-1 rounded-md text-sm ${issue.status === 'pending' ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-200 text-gray-700 hover:bg-yellow-300'}`}
                                                disabled={issue.status === 'pending'}
                                            >
                                                Pending
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(issue._id, 'in process')
                                                }
                                                className={`px-3 py-1 rounded-md text-sm ${issue.status === 'in process' ? 'bg-blue-200 text-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'}`}
                                                disabled={issue.status === 'in process'}
                                            >
                                                In Process
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleStatusChange(issue._id, 'resolved')
                                                }
                                                className={`px-3 py-1 rounded-md text-sm ${issue.status === 'resolved' ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-700 hover:bg-green-300'}`}
                                                disabled={issue.status === 'resolved'}
                                            >
                                                Resolved
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No issues reported yet.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
