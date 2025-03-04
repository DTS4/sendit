import React from 'react';
//import './UserSidebar.css';
import { 
  Package, 
  ShoppingBag, 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Home, 
  LogOut 
} from 'lucide-react';

const UserSidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'orders', label: 'All Orders', icon: Package },
    // { id: 'items', label: 'My Items', icon: ShoppingBag },
    { id: 'new-order', label: 'New Order', icon: PlusCircle },
    // { id: 'received', label: 'Received', icon: CheckCircle },
    { id: 'cancelled', label: 'Cancelled', icon: XCircle },
    { id: 'in-transit', label: 'In Transit', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Home }
  ];

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
            className={`menu-item ${activeSection === id ? 'active' : ''}`}
          >
            <Icon className="menu-icon" />
            <span className="menu-label">{label}</span>
          </button>
        ))}
      </nav>
      <button className="logout-button">
        <LogOut className="menu-icon" />
        <span className="menu-label">Logout</span>
      </button>
    </div>
  );
};

export default UserSidebar;
