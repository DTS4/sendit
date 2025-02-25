import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
      <h1 className="analytics-title"></h1>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h2 className="analytics-card-title">Total Visitors</h2>
          <p className="analytics-stat text-blue">15,060</p>
        </div>
        <div className="analytics-card">
          <h2 className="analytics-card-title">Page Views</h2>
          <p className="analytics-stat text-green">45,320</p>
        </div>
      </div>

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

export default Analytics;
