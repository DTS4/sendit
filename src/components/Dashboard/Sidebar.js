import React, { useState } from "react";
import { Home, Settings, BarChart2, ShoppingBag, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as needed
import { toast } from "react-toastify";
import "../../styles/Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const { clearAuth } = useAuth(); // Get the clearAuth function from AuthContext

  const [showConfirm, setShowConfirm] = useState(false); // State for confirmation dialog

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    clearAuth(); // Clear authentication data
    navigate("/"); // Redirect to home page
    toast.success("You have been logged out successfully!", { autoClose: 3000 }); // Display success message
  };

  const confirmLogout = () => {
    setShowConfirm(true); // Show the confirmation dialog
  };

  const cancelLogout = () => {
    setShowConfirm(false); // Hide the confirmation dialog
  };

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <span className="sidebar-title">AdminDashboard</span>
      </div>
      <nav className="sidebar-menu">
        <ul className="nav-list">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => setActiveSection(id)}
                className={`menu-item ${activeSection === id ? "active" : ""}`}
              >
                <Icon className="menu-icon" />
                <span className="nav-text">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Logout Button */}
      <button className="logout-button" onClick={confirmLogout}>
        <LogOut className="menu-icon" />
        <span>Logout</span>
      </button>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="confirmation-dialog">
          <div className="dialog-content">
            <h3>Are you sure you want to log out?</h3>
            <div className="dialog-actions">
              <button className="confirm-btn" onClick={handleLogout}>
                Yes, Log Out
              </button>
              <button className="cancel-btn" onClick={cancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;