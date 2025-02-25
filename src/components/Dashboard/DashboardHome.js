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

      <div className="dashboard-widgets">
        <div className="widget-card">
          <h2 className="widget-title">Recent Activity</h2>
          {/* Add activity content here */}
        </div>
        <div className="widget-card">
          <h2 className="widget-title">Performance</h2>
          {/* Add performance chart here */}
        </div>
      </div>
    </div>
  );
}
