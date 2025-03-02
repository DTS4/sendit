import React, { useState, useEffect } from 'react';
import { Truck, MapPin } from 'lucide-react';
import axios from 'axios';  // Import axios for API calls
import '../../styles/UserInTransit.css'; // Import the CSS file

const UserInTransit = () => {
  const [inTransitOrders, setInTransitOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch in-transit orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace this URL with your backend endpoint
        const response = await axios.get('https://sendit-backend-j83j.onrender.com');
        console.log('API response:', response.data); // Log the response to verify its structure
        setInTransitOrders(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching in-transit orders:', err);
        setError('Failed to load orders.');
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
        {Array.isArray(inTransitOrders) && inTransitOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <Truck className="icon" />
                <span className="order-number">{order.orderNumber}</span>
              </div>
              <span className="status-badge">{order.status}</span>
            </div>

            <div className="order-details">
              <div className="detail-row">
                <MapPin className="icon-small" />
                <div>
                  <p className="label">Current Location</p>
                  <p className="value">{order.currentLocation}</p>
                </div>
              </div>

              <div>
                <p className="label">Tracking Number</p>
                <p className="value">{order.trackingNumber}</p>
              </div>

              <div>
                <p className="label">Estimated Delivery</p>
                <p className="value">{order.estimatedDelivery}</p>
              </div>
            </div>

            <div className="tracking-updates">
              <h4 className="updates-title">Tracking Updates</h4>
              <div className="updates-list">
                {order.updates.map((update, index) => (
                  <div key={index} className="update-item">
                    <span className="update-date">{update.date}</span>
                    <span className="update-status">{update.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-actions">
              <button className="track-button">Track Package</button>
              <button className="details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInTransit;