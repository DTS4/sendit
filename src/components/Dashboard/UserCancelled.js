import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import axios from 'axios';

const UserCancelled = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cancelled orders from backend
  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the JWT token from local storage
        const response = await axios.get('https://sendit-backend-j83j.onrender.com/parcels/cancelled', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = Array.isArray(response.data) ? response.data : [];
        setCancelledOrders(data);
      } catch (err) {
        setError('Failed to fetch cancelled orders');
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
      <div className="orders-list">
        {cancelledOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <XCircle className="icon" />
                <span className="order-number">{order.tracking_id}</span>
              </div>
              <span className="cancel-date">Cancelled on {new Date(order.cancel_date).toLocaleDateString()}</span>
            </div>
            
            <div className="order-details">
              <div className="detail-row">
                <span className="label">Reason:</span>
                <span className="value">{order.cancel_reason}</span>
              </div>
              
              <div className="detail-row">
                <span className="label">Refund Status:</span>
                <span className={`refund-status ${order.refund_status === 'Processed' ? 'processed' : 'pending'}`}>
                  {order.refund_status}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">${order.cost}</span>
              </div>
            </div>
            
            <div className="actions">
              <button className="view-details">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCancelled;