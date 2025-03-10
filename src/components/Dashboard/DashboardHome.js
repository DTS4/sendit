import React, { useEffect, useState } from "react";
import { Users, ShoppingBag,  } from "lucide-react";
import "../../styles/DashboardHome.css";
import { useAuth } from "../../context/AuthContext"; // Check the correct path

const DashboardHome = () => {
  const [stats, setStats] = useState([]);
  const { token } = useAuth(); // Get the token from AuthContext

  // Fetch stats from the backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "https://sendit-backend-j83j.onrender.com/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Fixed syntax
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        console.log("API Response:", data); // Log the API response for debugging

        setStats([
          {
            label: "Total Orders",
            value: data.total_deliveries || "N/A",
            icon: Users,
            trend: "+12.5%",
            color: "blue",
          },
          // {
          //   label: "Total Revenue",
          //   value: `$${data.delivered_orders || "N/A"}`,
          //   icon: DollarSign,
          //   trend: "+8.2%",
          //   color: "red",
          // },
          {
            label: "Delivered",
            value: data.delivered_orders || "N/A",
            icon: ShoppingBag,
            trend: "+3.8%",
            color: "green",
          },
          // {
          //   label: "Growth Rate",
          //   value: `${data.in_transit_orders || "N/A"}%`,
          //   icon: TrendingUp,
          //   trend: "+2.4%",
          //   color: "yellow",
          // },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [token]);

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
                <span className="trend-text">vs Last Month</span>
              </div>
            </div>
          );
        })}
      </div>
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
};

export default DashboardHome;