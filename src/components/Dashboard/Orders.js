import { useState } from "react";
import "../../styles/Orders.css";

const orders = [
  { id: 1, customer: "John Doe", product: "Widget A", amount: 50.0, status: "Shipped" },
  { id: 2, customer: "Jane Smith", product: "Gadget B", amount: 75.5, status: "Processing" },
  { id: 3, customer: "Bob Johnson", product: "Tool C", amount: 120.0, status: "Delivered" },
  { id: 4, customer: "Alice Brown", product: "Device D", amount: 200.0, status: "Pending" },
  { id: 5, customer: "Charlie Wilson", product: "Accessory E", amount: 30.0, status: "Shipped" },
];

const Orders = () => {
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
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>${order.amount.toFixed(2)}</td>
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
