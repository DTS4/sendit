import React, { useState, useEffect } from 'react';
import { Bell, User, Search } from 'lucide-react';
import axios from 'axios';  // Import axios for API calls
import '../../styles/UserHeader.css'; // Import the CSS file

const UserHeader = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and notifications from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your backend endpoints
        const userResponse = await axios.get('http://localhost:5000/api/user');
        const notificationsResponse = await axios.get('http://localhost:5000/api/notifications');
        
        setUser(userResponse.data);
        setNotifications(notificationsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <Search className="search-icon" />
          </div>
        </div>

        <div className="header-icons">
          <button className="notification-button">
            <Bell className="notification-icon" />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
          
          <div className="user-info">
            <img
              src={user?.avatar || 'https://via.placeholder.com/150'}  // Fallback if avatar is missing
              alt="User avatar"
              className="user-avatar"
            />
            <span className="user-name">{user?.name || 'Guest'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
