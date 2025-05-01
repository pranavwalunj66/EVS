import React, { useState, useEffect } from 'react';
import Hero2 from './Hero2';

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
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/issues/${issueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

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
      <Hero2/>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* List of Issues */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">All Issues</h3>
        {issues.length > 0 ? (
          <ul>
            {issues.map((issue) => (
              <li key={issue._id} className="border-b py-2">
                <p>Description: {issue.description}</p>
                <p>Location: {issue.location}</p>
                <p>Address: {issue.address}</p>
                <p>Status: {issue.status}</p>
                {issue.imageUrl && (
                        <img src={import.meta.env.VITE_BACKEND_URL + issue.imageUrl} alt="Issue" className="w-32 h-32 object-cover" />
                )}
                <div className="mt-2">
                  <button
                    onClick={() => handleStatusChange(issue._id, 'pending')}
                    className="bg-yellow-500 text-white p-1 rounded mr-1"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(issue._id, 'in process')}
                    className="bg-blue-500 text-white p-1 rounded mr-1"
                  >
                    In Process
                  </button>
                  <button
                    onClick={() => handleStatusChange(issue._id, 'resolved')}
                    className="bg-green-500 text-white p-1 rounded"
                  >
                    Resolved
                  </button>
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
