import React, { useState, useEffect } from 'react';
import { Truck, MapPin, X } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserInTransit.css';

const UserInTransit = () => {
  const [inTransitOrders, setInTransitOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the selected order for details
  const [showTrackingModal, setShowTrackingModal] = useState(false); // Track visibility of tracking modal

  // Fetch in-transit orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://sendit-backend-j83j.onrender.com/parcels', {
          params: {
            status: 'In Transit', // Filter by status
          },
        });
        console.log('API response:', response.data); // Log to check data structure

        // Ensure the response is an array
        const orders = Array.isArray(response.data) ? response.data : [];
        console.log('Processed orders:', orders);

        if (orders.length > 0) {
          setInTransitOrders(orders);
        } else {
          console.warn('No orders found.');
        }
      } catch (err) {
        console.error('Error fetching in-transit orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle viewing order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  // Function to close the order details modal
  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  // Function to handle tracking package
  const handleTrackPackage = (order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
  };

  // Function to close the tracking modal
  const handleCloseTrackingModal = () => {
    setShowTrackingModal(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="in-transit-container">
      <h2 className="title">In Transit Orders</h2>

      <div className="orders-list">
        {inTransitOrders.length > 0 ? (
          inTransitOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <Truck className="icon" />
                  <span className="order-number">{order.tracking_id || 'N/A'}</span>
                </div>
                <span className="status-badge">{order.status || 'Unknown'}</span>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <MapPin className="icon-small" />
                  <div>
                    <p className="label">Current Location</p>
                    <p className="value">{order.current_location || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <p className="label">Tracking Number</p>
                  <p className="value">{order.tracking_id || 'N/A'}</p>
                </div>

                <div>
                  <p className="label">Estimated Delivery</p>
                  <p className="value">{order.estimated_delivery || 'N/A'}</p>
                </div>
              </div>

              <div className="tracking-updates">
                <h4 className="updates-title">Tracking Updates</h4>
                <div className="updates-list">
                  {order.updates && order.updates.length > 0 ? (
                    order.updates.map((update, index) => (
                      <div key={index} className="update-item">
                        <span className="update-date">{update.date || 'N/A'}</span>
                        <span className="update-status">{update.status || 'N/A'}</span>
                      </div>
                    ))
                  ) : (
                    <p>No tracking updates available.</p>
                  )}
                </div>
              </div>

              <div className="order-actions">
                <button className="track-button" onClick={() => handleTrackPackage(order)}>
                  Track Package
                </button>
                <button className="details-button" onClick={() => handleViewDetails(order)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders in transit.</p>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-button" onClick={handleCloseDetails}>
                <X className="icon" />
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-section">
                <h3>Tracking Information</h3>
                <div className="modal-row">
                  <span className="label">Tracking Number:</span>
                  <span className="value">{selectedOrder.tracking_id || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Status:</span>
                  <span className="value">{selectedOrder.status || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Current Location:</span>
                  <span className="value">{selectedOrder.current_location || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Estimated Delivery:</span>
                  <span className="value">{selectedOrder.estimated_delivery || 'N/A'}</span>
                </div>
              </div>

              <div className="modal-section">
                <h3>Parcel Details</h3>
                <div className="modal-row">
                  <span className="label">Pickup Location:</span>
                  <span className="value">{selectedOrder.pickup_location || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Destination:</span>
                  <span className="value">{selectedOrder.destination || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Weight:</span>
                  <span className="value">{selectedOrder.weight || 'N/A'} kg</span>
                </div>
                <div className="modal-row">
                  <span className="label">Description:</span>
                  <span className="value">{selectedOrder.description || 'N/A'}</span>
                </div>
              </div>

              <div className="modal-section">
                <h3>Tracking Updates</h3>
                {selectedOrder.updates && selectedOrder.updates.length > 0 ? (
                  selectedOrder.updates.map((update, index) => (
                    <div key={index} className="modal-row">
                      <span className="label">{update.date || 'N/A'}:</span>
                      <span className="value">{update.status || 'N/A'}</span>
                    </div>
                  ))
                ) : (
                  <p>No tracking updates available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Information Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Tracking Information</h2>
              <button className="close-button" onClick={handleCloseTrackingModal}>
                <X className="icon" />
              </button>
            </div>

            <div className="modal-content">
              <div className="modal-section">
                <div className="modal-row">
                  <span className="label">Tracking Number:</span>
                  <span className="value">{selectedOrder.tracking_id || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Status:</span>
                  <span className="value">{selectedOrder.status || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Current Location:</span>
                  <span className="value">{selectedOrder.current_location || 'N/A'}</span>
                </div>
                <div className="modal-row">
                  <span className="label">Estimated Delivery:</span>
                  <span className="value">{selectedOrder.estimated_delivery || 'N/A'}</span>
                </div>
              </div>

              <div className="modal-section">
                <h3>Tracking Updates</h3>
                {selectedOrder.updates && selectedOrder.updates.length > 0 ? (
                  selectedOrder.updates.map((update, index) => (
                    <div key={index} className="modal-row">
                      <span className="label">{update.date || 'N/A'}:</span>
                      <span className="value">{update.status || 'N/A'}</span>
                    </div>
                  ))
                ) : (
                  <p>No tracking updates available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInTransit;