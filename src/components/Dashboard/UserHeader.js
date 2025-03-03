import React, { useState, useEffect } from 'react';
import { Bell, Search } from 'lucide-react'; // Removed User icon since avatar is removed
import axios from 'axios'; // Import axios for API calls
import '../../styles/UserHeader.css'; // Import the CSS file

const UserHeader = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Use the production backend URL
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://sendit-backend-j83j.onrender.com';
        const response = await axios.get(`${backendUrl}/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the JWT token
          },
        });

        if (response.data && response.data.username) {
          setUser(response.data); // Set the user data in state
        } else {
          throw new Error('Invalid user data received');
        }
      } catch (err) {
        console.error('Error fetching user data:', err.message);
        setError('Failed to load user data');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div className="loading">Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="error">{error}</div>; // Display error message
  }

  return (
    <header className="header">
      <div className="header-container">
        {/* Search Container */}
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <Search className="search-icon" /> {/* Search icon */}
          </div>
        </div>

        {/* Header Icons */}
        <div className="header-icons">
          <button className="notification-button">
            <Bell className="notification-icon" />
            {/* Placeholder for notifications badge */}
          </button>

          {/* User Info */}
          <div className="user-info">
            <span className="user-name">{user?.username || 'Guest'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;