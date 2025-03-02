import { Bell, Search, User } from "lucide-react";


const Navbar = () => {
  return (
    <nav className="navbar1">
      <div className="search-container1">
        <input type="text" placeholder="Search..." className="search-input1" />
        <button className="search-button">
          <Search className="search-icon1" />
        </button>
      </div>
      
      <div className="user-actions1">
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
