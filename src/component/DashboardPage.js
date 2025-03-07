import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import DashboardHome from '../components/Dashboard/DashboardHome';
import Profile from '../components/Dashboard/Profile';
import Analytics from '../components/Dashboard/Analytics';
import Orders from '../components/Dashboard/Orders';
import '../styles/Analytics.css';
import '../styles/Orders.css';
import '../styles/Profile.css';
import '../styles/Sidebar.css';
import '../styles/DashboardHome.css';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

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
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Pass setIsSidebarOpen to Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen} // Pass the setter function
      />

      {/* Main Content Area */}
      <div className={`flex-1 p-6 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <main>
          <div className="dashboard-container">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}