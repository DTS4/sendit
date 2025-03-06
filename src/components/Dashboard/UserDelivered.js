import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserDelivered.css'; // Import the CSS file

const UserDelivered = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const response = await axios.get('https://sendit-backend-j83j.onrender.com/parcels');
        const allOrders = response.data;

        const filteredOrders = allOrders.filter(order => order.status === 'Delivered');

        // Ensure the date is valid; fallback to current date if missing
        const validatedOrders = filteredOrders.map(order => ({
          ...order,
          date: order.date ? new Date(order.date).toISOString() : new Date().toISOString(),
        }));

        setDeliveredOrders(validatedOrders);
      } catch (err) {
        console.error('Error fetching delivered orders:', err);
        setError('Failed to fetch delivered orders');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredOrders();
  }, []);

  const handleViewDetails = (order) => setSelectedOrder(order);
  const handleCloseDetails = () => setSelectedOrder(null);

  if (loading) return <div className="loading">Loading delivered orders...</div>;
  if (error) return <div className="error">{error}</div>;
  if (deliveredOrders.length === 0) return <div className="no-orders">No delivered orders found.</div>;

  return (
    <div className="delivered-container">
      <h2 className="delivered-title">Delivered Orders</h2>
      <div className="delivered-list">
        {deliveredOrders.map((order) => (
          <div key={order.id} className="delivered-card">
            <div className="delivered-header">
              <div className="order-info">
                <CheckCircle className="icon-green" />
                <span className="order-number">{order.tracking_id || 'N/A'}</span>
              </div>
              <span className="delivery-date">
                Delivered on{' '}
                {order.date
                  ? new Date(order.date).toLocaleDateString() // Display only the date
                  : 'N/A'}
              </span>
            </div>
            <div className="delivered-details">
              <div>
                <p className="detail-label">Delivery Address</p>
                <p className="detail-value">{order.destination || 'N/A'}</p>
              </div>
              <div className="items-section">
                <h4 className="items-title">Items</h4>
                <p>{order.description || 'No items available.'}</p> {/* Fetch parcel description */}
              </div>
              <div className="total-section">
                <span className="total-amount">Total: ${order.cost?.toFixed(2) || 'N/A'}</span>
                <button className="view-details-button" onClick={() => handleViewDetails(order)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying order details */}
      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="close-button" onClick={handleCloseDetails}>
                <X className="icon" />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="label">Tracking ID:</span>
                <span className="value">{selectedOrder.tracking_id || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Delivery Date:</span>
                <span className="value">
                  {selectedOrder.date
                    ? new Date(selectedOrder.date).toLocaleDateString() // Display only the date
                    : 'N/A'}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Delivery Address:</span>
                <span className="value">{selectedOrder.destination || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Items:</span>
                <span className="value">{selectedOrder.description || 'No items available.'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Total Amount:</span>
                <span className="value">${selectedOrder.cost?.toFixed(2) || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDelivered;