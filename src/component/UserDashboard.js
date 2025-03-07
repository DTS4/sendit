import React, { useState } from 'react';
import UserSidebar from '../components/Dashboard/UserSidebar';
import UserOrders from '../components/Dashboard/UserOrders';
import UserItems from '../components/Dashboard/UserItems';
import UserNewOrder from '../components/Dashboard/UserNewOrder';
import UserCancelled from '../components/Dashboard/UserCancelled';
import UserInTransit from '../components/Dashboard/UserInTransit';
import UserDelivered from '../components/Dashboard/UserDelivered';
import '../styles/UserSidebar.css';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('orders');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <UserOrders />;
      case 'items':
        return <UserItems />;
      case 'new-order':
        return <UserNewOrder />;
      case 'cancelled':
        return <UserCancelled />;
      case 'in-transit':
        return <UserInTransit />;
      case 'delivered':
        return <UserDelivered />;
      default:
        return <UserOrders />;
    }
  };

  return (
    <div className="user-dashboard">
      {/* Pass setIsSidebarOpen to UserSidebar */}
      <UserSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={`dashboard-main ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <main className="dashboard-content">
          <div className="dashboard-container1">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;