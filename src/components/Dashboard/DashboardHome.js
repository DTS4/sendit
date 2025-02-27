import React from 'react';
import { Users, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import "../../styles/DashboardHome.css";

const stats = [
  { label: 'Total Customers', value: '2,543', icon: Users, trend: '+12.5%', color: 'blue' },
  { label: 'Total Revenue', value: '$45,234', icon: DollarSign, trend: '+8.2%', color: 'green' },
  { label: 'Total Orders', value: '1,345', icon: ShoppingBag, trend: '+3.8%', color: 'purple' },
  { label: 'Growth Rate', value: '24.5%', icon: TrendingUp, trend: '+2.4%', color: 'yellow' },
];

export default function DashboardHome() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div>
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
                <div className={`stat-icon ${stat.color}`}>
                  <Icon className="icon" />
                </div>
              </div>
              <div className="trend-indicator">
                <span className="trend-positive">{stat.trend}</span>
                <span className="trend-text">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Section */}
      <div className="map-container">
        <h2 className="widget-title">Map Overview</h2>
        <iframe
          className="map-frame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508616!2d144.9537363156839!3d-37.81720997975165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f2ffb1%3A0x5045675218cce7f0!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2s!4v1640999000000!5m2!1sen!2s"
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
        ></iframe>
      </div>
    </div>
  );
}
