import React, { useEffect, useState } from "react";
import "../../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://sendit-backend-j83j.onrender.com/parcels");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>
      <div className="orders-card">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="order-row">
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.description}</td>
                <td>${order.cost ? Number(order.cost).toFixed(2) : "N/A"}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to determine the status class for styling
const getStatusClass = (status) => {
  switch (status) {
    case "Shipped":
      return "status-shipped";
    case "Processing":
      return "status-processing";
    case "Delivered":
      return "status-delivered";
    case "Pending":
      return "status-pending";
    default:
      return "";
  }
};

export default Orders;
