import React, { useState } from 'react';
import Sidebar from './components/Sidebar.js';
import OrderStatus from './components/OrderStatus.js';
import RecentOrders from './components/RecentOrders.js';
import CreateOrder from './components/CreateOrder.js';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Welcome back, User!</h1>
              <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
            </div>
            <OrderStatus />
            <RecentOrders />
          </div>
        );
      case 'orders':
        return <RecentOrders />;
      case 'create':
        return <CreateOrder />;
      case 'items':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold">Items Management</h2>
            <p className="text-gray-600 mt-2">Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}

export default App;