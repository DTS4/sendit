import React from 'react';
//import './UserOrders.css';

const UserOrders = () => {
  const orders = [
    {
      id: 1,
      orderNumber: '#ORD-2024-001',
      date: '2024-03-15',
      status: 'In Transit',
      amount: 299.99,
      items: 3
    },
    // Add more orders as needed
  ];

  return (
    <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>

      <div className="order-summary">
        <div className="summary-card">
          <div className="summary-icon summary-blue">📦</div>
          <div className="summary-info">
            <h3>Total Orders</h3>
            <p>156</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon summary-green">📅</div>
          <div className="summary-info">
            <h3>This Month</h3>
            <p>24</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon summary-purple">💰</div>
          <div className="summary-info">
            <h3>Total Spent</h3>
            <p>$4,287.34</p>
          </div>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.date}</td>
                <td>
                  <span className="order-status">{order.status}</span>
                </td>
                <td>${order.amount}</td>
                <td>{order.items}</td>
                <td>
                  <button className="view-details">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
