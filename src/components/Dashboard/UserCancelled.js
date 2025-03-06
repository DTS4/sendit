import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserCancelled.css'; // Import the CSS file

const UserCancelled = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const userId = 1; // Replace with dynamic logic for current user ID
        const response = await axios.get(
          `https://sendit-backend-j83j.onrender.com/parcels?user_id=${userId}`
        );

        if (response.status !== 200) {
          throw new Error('Failed to fetch orders');
        }

        const allOrders = Array.isArray(response.data) ? response.data : [];
        const cancelled = allOrders.filter((order) => order.status === 'Cancelled');

        // Ensure cancel_date is valid and fallback to current date if missing
        const cancelledWithDate = cancelled.map((order) => ({
          ...order,
          cancel_date: order.cancel_date
            ? new Date(order.cancel_date).toISOString()
            : new Date().toISOString(), // Fallback to current date
        }));

        setCancelledOrders(cancelledWithDate);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleCloseModal = () => setSelectedOrder(null);

  if (loading) return <div className="loading">Loading cancelled orders...</div>;
  if (error) return <div className="error">{error}</div>;

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
                  Cancelled on{' '}
                  {new Date(order.cancel_date).toLocaleDateString() || 'N/A'}
                </span>
              </div>
              <div className="order-details">
                <div className="detail-row">
                  <span className="label">Reason:</span>
                  <span className="value">{order.cancel_reason || 'N/A'}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Refund Status:</span>
                  <span
                    className={`refund-status ${
                      order.refund_status === 'Processed' ? 'processed' : 'pending'
                    }`}
                  >
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
                <span
                  className={`value ${
                    selectedOrder.refund_status === 'Processed' ? 'processed' : 'pending'
                  }`}
                >
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