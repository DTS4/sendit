import React, { useState } from "react";
import { Home, BarChart2, ShoppingBag, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "../../styles/Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
  ];

  const handleLogout = () => {
    clearAuth();
    navigate("/");
    toast.success("You have been logged out successfully!", { autoClose: 3000 });
  };

  const confirmLogout = () => {
    setShowConfirm(true);
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <aside className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
      {/* Hamburger Menu Button for Small Screens */}
      <button
        className="hamburger-menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
      >
        ☰
      </button>

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