import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import "../../styles/Analytics.css";

const data = [
  { name: "Jan", visitors: 4000, pageViews: 2400 },
  { name: "Feb", visitors: 3000, pageViews: 1398 },
  { name: "Mar", visitors: 2000, pageViews: 9800 },
  { name: "Apr", visitors: 2780, pageViews: 3908 },
  { name: "May", visitors: 1890, pageViews: 4800 },
  { name: "Jun", visitors: 2390, pageViews: 3800 },
];

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="analytics-grid">
        <AnalyticsCard title="Total Visitors" value="15,060" color="text-blue" />
        <AnalyticsCard title="Page Views" value="45,320" color="text-green" />
      </div>

      {/* Chart Section */}
      <div className="analytics-card chart-container">
        <h2 className="chart-title">Visitor Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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
