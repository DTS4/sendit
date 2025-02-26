import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CreateOrder from "./components/CreateOrder";
import OrderStatus from "./components/OrderStatus";
import RecentOrders from "./components/RecentOrders";

const Overview = () => <h1>Overview Page</h1>;
const Items = () => <h1>Items Page</h1>;

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/orders" element={<OrderStatus />} />
            <Route path="/items" element={<Items />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/recent-orders" element={<RecentOrders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;