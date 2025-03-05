import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../styles/Analytics.css";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data from the backend
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(
          "https://sendit-backend-j83j.onrender.com/stats"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        const data = await response.json();
        setAnalyticsData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Transform data for chart
  const chartData =
    analyticsData &&
    [
      { name: "Total Deliveries", value: analyticsData.total_deliveries || 0 },
      { name: "Pending Orders", value: analyticsData.pending_orders || 0 },
      { name: "In Transit Orders", value: analyticsData.in_transit_orders || 0 },
      { name: "Delivered Orders", value: analyticsData.delivered_orders || 0 },
    ];

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">Analytics Dashboard</h1>

      <div className="analytics-grid">
        <AnalyticsCard
          title="Total Deliveries"
          value={analyticsData.total_deliveries || "N/A"}
          color="#2563EB"
        />
        <AnalyticsCard
          title="Pending Orders"
          value={analyticsData.pending_orders || "N/A"}
          color="#16A34A"
        />
        <AnalyticsCard
          title="In Transit Orders"
          value={analyticsData.in_transit_orders || "N/A"}
          color="#F59E0B"
        />
        <AnalyticsCard
          title="Delivered Orders"
          value={analyticsData.delivered_orders || "N/A"}
          color="#EF4444"
        />
      </div>

      {chartData && (
        <div className="analytics-card chart-container">
          <h2 className="chart-title">Order Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

// Analytics Card Component
const AnalyticsCard = ({ title, value, color }) => (
  <div
    className="analytics-card"
    style={{ borderBottom: `4px solid ${color}` }}
  >
    <h2 className="analytics-card-title">{title}</h2>
    <p className="analytics-stat" style={{ color }}>
      {value}
    </p>
  </div>
);

export default Analytics;