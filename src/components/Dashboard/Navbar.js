import { Bell, Search, User } from "lucide-react";
import "../../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="search-button">
          <Search className="search-icon" />
        </button>
      </div> */}
      
      <div className="user-actions">
        <button className="notifications-button">
          <Bell className="icon" />
          <span className="notifications-badge">3</span>
        </button>
        <button className="user-profile">
          <User className="icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
