import React, { useState, useEffect } from 'react';

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
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/users/${user._id}/issues`);
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

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/users/${user._id}/issues`, {
        method: 'POST',
        body: formData,
      });

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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>

      {/* Issue Submission Form */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Report a New Issue</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="description" className="block">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newIssue.description}
              onChange={handleInputChange}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="location" className="block">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newIssue.location}
              onChange={handleInputChange}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="block">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={newIssue.address}
              onChange={handleInputChange}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="image" className="block">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full border p-2"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Submit Issue
          </button>
        </form>
      </div>

      {/* List of Issues */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Your Issues</h3>
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

export default UserDashboard;
