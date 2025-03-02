import React, { useEffect, useState } from 'react';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://sendit-backend-j83j.onrender.com/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Token:', localStorage.getItem('token'));
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        console.log('Fetched orders:', data);

        setOrders(data);

        // Calculate total orders, monthly orders, and total spent
        setTotalOrders(data.length);
        setMonthlyOrders(data.filter(order => new Date(order.date).getMonth() === new Date().getMonth()).length);
        setTotalSpent(data.reduce((total, order) => total + order.amount, 0));
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="orders-container">
      <h2 className="orders-title">All Orders</h2>

      <div className="order-summary">
        <div className="summary-card">
          <div className="summary-icon summary-blue">📦</div>
          <div className="summary-info">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon summary-green">📅</div>
          <div className="summary-info">
            <h3>This Month</h3>
            <p>{monthlyOrders}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon summary-purple">💰</div>
          <div className="summary-info">
            <h3>Total Spent</h3>
            <p>${totalSpent.toFixed(2)}</p>
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
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <span className="order-status">{order.status}</span>
                </td>
                <td>${order.amount.toFixed(2)}</td>
                <td>{order.items.length}</td>
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
