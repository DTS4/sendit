import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserCancelled.css'; // Import the CSS file

const UserCancelled = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cancelled orders from backend
  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const response = await axios.get('https://sendit-backend-j83j.onrender.com/parcels/cancelled');

        if (response.status !== 200) {
          throw new Error('Failed to fetch cancelled orders');
        }

        const data = Array.isArray(response.data) ? response.data : [];
        setCancelledOrders(data);
      } catch (err) {
        console.error('Error fetching cancelled orders:', err);
        setError(err.message || 'Failed to fetch cancelled orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledOrders();
  }, []);

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
                <button className="view-details">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No cancelled orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserCancelled;