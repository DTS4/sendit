import React, { useEffect, useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import "../../styles/Analytics.css";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  // Fetch analytics data from the backend
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch("https://sendit-backend-j83j.onrender.com/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="analytics-grid">
        <AnalyticsCard title="Total Visitors" value={analyticsData.total_deliveries || "Loading..."} color="text-blue" />
        <AnalyticsCard title="Page Views" value={analyticsData.delivered_orders || "Loading..."} color="text-green" />
      </div>

      {/* Chart Section */}
      <div className="analytics-card chart-container">
        <h2 className="chart-title">Visitor Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visitors" stroke="#3B82F6" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="pageViews" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Reusable Analytics Card Component
const AnalyticsCard = ({ title, value, color }) => (
  <div className="analytics-card">
    <h2 className="analytics-card-title">{title}</h2>
    <p className={`analytics-stat ${color}`}>{value}</p>
  </div>
);

export default Analytics;