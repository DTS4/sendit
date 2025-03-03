import React, { useState, useEffect } from 'react';
import { Truck, MapPin } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserInTransit.css';

const UserInTransit = () => {
  const [inTransitOrders, setInTransitOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch in-transit orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://sendit-backend-j83j.onrender.com/parcels', );
        console.log('API response:', response.data); // Log to check data structure

        // Check if response is an array or an object with a data property
        const orders = Array.isArray(response.data) ? response.data : response.data.data || [];
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
                  <span className="order-number">{order.orderNumber || 'N/A'}</span>
                </div>
                <span className="status-badge">{order.status || 'Unknown'}</span>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <MapPin className="icon-small" />
                  <div>
                    <p className="label">Current Location</p>
                    <p className="value">{order.currentLocation || 'N/A'}</p>
                  </div>
                </div>

                <div>
                  <p className="label">Tracking Number</p>
                  <p className="value">{order.trackingNumber || 'N/A'}</p>
                </div>

                <div>
                  <p className="label">Estimated Delivery</p>
                  <p className="value">{order.estimatedDelivery || 'N/A'}</p>
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
                <button className="track-button">Track Package</button>
                <button className="details-button">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders in transit.</p>
        )}
      </div>
    </div>
  );
};

export default UserInTransit;
