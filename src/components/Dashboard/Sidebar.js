import { Link } from "react-router-dom";
import { Home, User, Settings, BarChart2, ShoppingBag, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">Dashboard</span>
      </div>
      <nav>
        <ul className="navv-list">
          <li>
            <Link to="/dashboard" className="navv-item">
              <Home className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className="navv-item">
              <User className="nav-icon" />
              <span className="nav-text">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" className="navv-item">
              <Settings className="nav-icon" />
              <span className="nav-text">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/analytics" className="navv-item">
              <BarChart2 className="nav-icon" />
              <span className="nav-text">Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders" className="navv-item">
              <ShoppingBag className="nav-icon" />
              <span className="nav-text">Orders</span>
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button">
        <LogOut className="nav-icon" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
