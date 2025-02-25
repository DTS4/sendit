import React from "react";
import { Link } from "react-router-dom";
import { Home, Package, PlusCircle, ShoppingCart } from "lucide-react";
import "../styles/Sidebar.css"; 

const SidebarItem = ({ to, icon, label }) => (
  <Link to={to} className="sidebar-item">
    {icon}
    <span className="sidebar-label">{label}</span>
  </Link>
);

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Dashboard</div>
      <nav className="sidebar-nav">
        <SidebarItem to="/overview" icon={<Home size={20} />} label="Overview" />
        <SidebarItem to="/OrderStatus" icon={<ShoppingCart size={20} />} label="My Orders" />
        <SidebarItem to="/items" icon={<Package size={20} />} label="Items" />
        <SidebarItem to="/CreateOrder" icon={<PlusCircle size={20} />} label="Create Order" />
      </nav>
    </div>
  );
};

export default Sidebar;
