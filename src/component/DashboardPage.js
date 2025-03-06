import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import DashboardHome from '../components/Dashboard/DashboardHome';
import Profile from '../components/Dashboard/Profile';
import Analytics from '../components/Dashboard/Analytics';
import Orders from '../components/Dashboard/Orders';
import Settings from '../components/Dashboard/Settings';
import '../styles/Analytics.css';
import '../styles/Orders.css';
import '../styles/Profile.css';
import '../styles/Settings.css';
import '../styles/Sidebar.css';
import '../styles/DashboardHome.css';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <DashboardHome />;
      case 'profile':
        return <Profile />;
      case 'analytics':
        return <Analytics />;
      case 'orders':
        return <Orders />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 ml-64 p-6">
        <main>
          <div className="dashboard-container">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}