import React, { useEffect, useState, useCallback } from 'react';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedDestination, setUpdatedDestination] = useState('');

  const API_BASE_URL = 'https://sendit-backend-j83j.onrender.com/parcels';

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        console.log('Fetched orders:', data);

        // Ensure all dates are valid
        const validatedOrders = data.map((order) => ({
          ...order,
          date: order.date ? new Date(order.date).toISOString() : new Date().toISOString(), // Fallback to current date if invalid
        }));

        setOrders(validatedOrders);
        setTotalOrders(validatedOrders.length);
        setMonthlyOrders(
          validatedOrders.filter((order) => new Date(order.date).getMonth() === new Date().getMonth()).length
        );
        setTotalSpent(validatedOrders.reduce((total, order) => total + (order.cost || 0), 0));
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
  const handleCancelOrder = useCallback(async (orderId) => {
    const confirmCancellation = window.confirm(
      'Are you sure you want to cancel this order? This action cannot be undone.'
    );
    if (!confirmCancellation) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${orderId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cancel_reason: 'User requested cancellation' }),
      });

      if (!response.ok) throw new Error('Failed to cancel order');

      const result = await response.json();
      console.log('Order cancelled:', result);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: 'Cancelled' } : order
        )
      );
      alert('Order cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  }, []);

  // Function to handle order update (destination only)
const handleUpdateOrder = useCallback(async () => {
  if (!selectedOrder || !updatedDestination.trim()) {
    alert('Please provide a valid destination.');
    return;
  }

  if (updatedDestination.length < 3 || updatedDestination.length > 100) {
    alert('Destination must be between 3 and 100 characters.');
    return;
  }

  // Validate that the destination is specific enough
  if (updatedDestination.split(',').length < 2) {
    alert('Please provide a more specific address (e.g., "City, Country").');
    return;
  }

  try {
    const updateData = { destination: updatedDestination };

    console.log("Sending update request:", updateData); // Debugging

    const response = await fetch(`${API_BASE_URL}/${selectedOrder.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Server response:', response.status, errorMessage);
      throw new Error(`Failed to update order: ${errorMessage}`);
    }

    const result = await response.json();
    console.log('Order updated:', result);

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, destination: updatedDestination } : order
      )
    );
    handleCloseModal();
    alert('Order updated successfully!');
  } catch (error) {
    console.error('Error updating order:', error);
    alert(`Failed to update order. ${error.message}`);
  }
}, [selectedOrder, updatedDestination]);

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setUpdatedDestination('');
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
                <td>{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</td>
                <td className={`order-status ${order.status.toLowerCase()}`}>{order.status}</td>
                <td>${order.cost?.toFixed(2) || 'N/A'}</td>
                <td>{order.destination}</td>
                <td>
                  {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                    <>
                      <button className="update-order" onClick={() => setSelectedOrder(order)}>
                        Update
                      </button>
                      <button className="cancel-order" onClick={() => handleCancelOrder(order.id)}>
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Order</h3>
            <input
              type="text"
              value={updatedDestination}
              onChange={(e) => setUpdatedDestination(e.target.value)}
              placeholder="Enter new destination"
            />
            <button onClick={handleUpdateOrder}>Update</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;