import React, { useState } from 'react';
import UserSidebar from '../components/Dashboard/UserSidebar';
import UserHeader from '../components/Dashboard/UserHeader';
import UserOrders from '../components/Dashboard/UserOrders';
import UserItems from '../components/Dashboard/UserItems';
import UserNewOrder from '../components/Dashboard/UserNewOrder';
// import UserReceived from '../components/Dashboard/UserReceived';
import UserCancelled from '../components/Dashboard/UserCancelled';
import UserInTransit from '../components/Dashboard/UserInTransit';
import UserDelivered from '../components/Dashboard/UserDelivered';
import '../styles/UserCancelled.css';
import '../styles/UserInTransit.css';
import '../styles/UserDelivered.css';
import '../styles/UserOrders.css';
import '../styles/UserItems.css';
// import '../styles/UserNewOrder.css';
import '../styles/UserSidebar.css';
import '../styles/UserHeader.css';
import '../styles/UserDashboard.css'; 

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('orders');

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <UserOrders />;
      case 'items':
        return <UserItems />;
      case 'new-order':
        return <UserNewOrder />;
      // case 'received':
      //   return <UserReceived />;
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
      <UserSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="dashboard-main">
        <UserHeader />
        <main className="dashboard-content">
          <div className="dashboard-container">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
