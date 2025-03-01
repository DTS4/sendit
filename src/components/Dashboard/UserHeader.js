import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import '../../styles/UserHeader.css'; // Import the CSS file

const UserHeader = () => {
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
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-info">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              className="user-avatar"
            />
            <span className="user-name">Bobb</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
