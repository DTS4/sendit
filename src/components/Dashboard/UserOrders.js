import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For navigating to Cancelled Orders page

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
        const response = await fetch('https://sendit-backend-j83j.onrender.com/parcels');

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        console.log('Fetched orders:', data);

        setOrders(data);

        // Calculate total orders, monthly orders, and total spent
        setTotalOrders(data.length);
        setMonthlyOrders(
          data.filter((order) => new Date(order.date).getMonth() === new Date().getMonth()).length
        );
        setTotalSpent(data.reduce((total, order) => total + (order.cost || 0), 0));
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle order cancellation
  const handleCancelOrder = async (orderId) => {
    try {
      const confirmCancellation = window.confirm(
        'Are you sure you want to cancel this order? This action cannot be undone.'
      );

      if (!confirmCancellation) return;

      const response = await fetch(`https://sendit-backend-j83j.onrender.com/parcels/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Uncomment the line below if JWT token is required later
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ cancel_reason: 'User requested cancellation' }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      const result = await response.json();
      console.log('Order cancelled:', result);

      // Refresh the orders list after successful cancellation
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      );
      setOrders(updatedOrders);

      // Redirect to Cancelled Orders page
      window.location.href = '/cancelled-orders';
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

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
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.tracking_id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <span className={`order-status ${order.status === 'Cancelled' ? 'cancelled' : ''}`}>
                    {order.status}
                  </span>
                </td>
                <td>${order.cost?.toFixed(2) || 'N/A'}</td>
                <td>{order.destination}</td>
                <td>
                  {order.status !== 'Cancelled' ? (
                    <button className="cancel-order" onClick={() => handleCancelOrder(order.id)}>
                      Cancel Order
                    </button>
                  ) : (
                    <Link to="/cancelled-orders" className="view-cancelled">
                      View Cancelled
                    </Link>
                  )}
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