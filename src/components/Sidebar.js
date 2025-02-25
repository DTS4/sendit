import React from "react";
import { Home, Package, PlusCircle, ShoppingCart } from "lucide-react";

import styles from '../styles/Sidebar.css';


const SidebarItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`sidebar-item ${active ? "active" : ""}`}>
    {icon}
    <span className="sidebar-label">{label}</span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      {/* Sidebar Logo */}
      <div className="sidebar-logo">Dashboard</div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        <SidebarItem
          icon={<Home size={20} />}
          label="Overview"
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <SidebarItem
          icon={<ShoppingCart size={20} />}
          label="My Orders"
          active={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        />
        <SidebarItem
          icon={<Package size={20} />}
          label="Items"
          active={activeTab === "items"}
          onClick={() => setActiveTab("items")}
        />
        <SidebarItem
          icon={<PlusCircle size={20} />}
          label="Create Order"
          active={activeTab === "create"}
          onClick={() => setActiveTab("create")}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
