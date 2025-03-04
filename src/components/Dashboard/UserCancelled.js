import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserCancelled.css';

const UserCancelled = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // For viewing order details

  // Fetch cancelled orders from backend
  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        // Get user ID from local storage or auth state
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('User not authenticated');

        const response = await axios.get(
          `https://sendit-backend-j83j.onrender.com/parcels/cancelled?user_id=${userId}`
        );

        if (response.status !== 200) {
          throw new Error('Failed to fetch cancelled orders');
        }

        const data = Array.isArray(response.data) ? response.data : [];
        setCancelledOrders(data);
      } catch (err) {
        console.error('Error fetching cancelled orders:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch cancelled orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <div className="loading-spinner">Loading cancelled orders...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
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
                  <span className="value">${order.cost?.toFixed(2) || 'N/A'}</span>
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
          <p className="no-orders">No cancelled orders found.</p>
        )}
      </div>

      {selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h3>Order Details</h3>
            <p><strong>Tracking ID:</strong> {selectedOrder.tracking_id}</p>
            <p><strong>Cancel Date:</strong> {new Date(selectedOrder.cancel_date).toLocaleString() || 'N/A'}</p>
            <p><strong>Reason:</strong> {selectedOrder.cancel_reason || 'N/A'}</p>
            <p><strong>Refund Status:</strong> {selectedOrder.refund_status || 'N/A'}</p>
            <p><strong>Amount:</strong> ${selectedOrder.cost?.toFixed(2) || 'N/A'}</p>
            <p><strong>Destination:</strong> {selectedOrder.destination || 'N/A'}</p>
            <button className="close-modal" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCancelled;
