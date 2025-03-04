import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserCancelled.css'; // Import the CSS file

const UserCancelled = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to track the selected order for details

  // Fetch all orders from backend
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // Replace USER_ID with the actual user ID (e.g., fetched from authentication state or local storage)
        const userId = 1; // Example user ID; replace this with dynamic logic to get the current user's ID

        const response = await axios.get(
          `https://sendit-backend-j83j.onrender.com/parcels?user_id=${userId}`
        );

        if (response.status !== 200) {
          throw new Error('Failed to fetch orders');
        }

        const allOrders = Array.isArray(response.data) ? response.data : [];

        // Filter cancelled orders
        const cancelled = allOrders.filter((order) => order.status === 'Cancelled');

        // Map cancelled orders to include the original order date
        const cancelledWithDate = cancelled.map((order) => ({
          ...order,
          cancel_date: order.date, // Use the original order date as the cancellation date
        }));

        setCancelledOrders(cancelledWithDate);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  // Function to handle opening the details modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  // Function to handle closing the details modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <div className="loading">Loading cancelled orders...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-cancelled-container">
      <h2 className="title">Cancelled Orders</h2>

      <div className="orders-list">
        {cancelledOrders.length > 0 ? (
          cancelledOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <XCircle className="icon" />
                  <span className="order-number">{order.tracking_id || 'N/A'}</span>
                </div>
                <span className="cancel-date">
                  Cancelled on {new Date(order.cancel_date).toLocaleDateString() || 'N/A'}
                </span>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="label">Reason:</span>
                  <span className="value">{order.cancel_reason || 'N/A'}</span>
                </div>

                <div className="detail-row">
                  <span className="label">Refund Status:</span>
                  <span className={`refund-status ${order.refund_status === 'Processed' ? 'processed' : 'pending'}`}>
                    {order.refund_status || 'N/A'}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="label">Amount:</span>
                  <span className="value">${order.cost || 'N/A'}</span>
                </div>
              </div>

              <div className="actions">
                <button className="view-details" onClick={() => handleViewDetails(order)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No cancelled orders found.</p>
        )}
      </div>

      {/* Modal for displaying order details */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Order Details</h3>
            <div className="modal-details">
              <div className="detail-row">
                <span className="label">Order ID:</span>
                <span className="value">{selectedOrder.tracking_id || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(selectedOrder.cancel_date).toLocaleDateString() || 'N/A'}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Reason:</span>
                <span className="value">{selectedOrder.cancel_reason || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Refund Status:</span>
                <span className={`value ${selectedOrder.refund_status === 'Processed' ? 'processed' : 'pending'}`}>
                  {selectedOrder.refund_status || 'N/A'}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">${selectedOrder.cost || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Destination:</span>
                <span className="value">{selectedOrder.destination || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className="value">{selectedOrder.status || 'N/A'}</span>
              </div>
            </div>
            <button className="close-modal" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCancelled;