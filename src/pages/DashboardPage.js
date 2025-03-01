import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
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
import '../styles/Navbar.css'; 
import '../styles/DashboardHome.css';



export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="mt-16 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}