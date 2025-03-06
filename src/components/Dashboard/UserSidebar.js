import React, { useState } from "react";
import { Package, PlusCircle, XCircle, Truck, Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Adjust the path as needed
import { toast } from "react-toastify";

const UserSidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false); // State for confirmation dialog

  const menuItems = [
    { id: "orders", label: "All Orders", icon: Package },
    { id: "new-order", label: "New Order", icon: PlusCircle },
    { id: "cancelled", label: "Cancelled", icon: XCircle },
    { id: "in-transit", label: "In Transit", icon: Truck },
    { id: "delivered", label: "Delivered", icon: Home },
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
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="sidebar-title">User Dashboard</h1>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`menu-item ${activeSection === id ? "active" : ""}`}
          >
            <Icon className="menu-icon" />
            <span className="menu-label">{label}</span>
          </button>
        ))}
      </nav>
      {/* Logout Button */}
      <button className="logout-button" onClick={confirmLogout}>
        <LogOut className="menu-icon" />
        <span className="menu-label">Logout</span>
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
    </div>
  );
};

export default UserSidebar;