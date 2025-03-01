import React from 'react';
import { XCircle } from 'lucide-react';
import '../../styles/UserCancelled.css'; // Import the CSS file

const UserCancelled = () => {
  const cancelledOrders = [
    {
      id: 1,
      orderNumber: '#ORD-2024-002',
      cancelDate: '2024-03-12',
      reason: 'Changed mind about purchase',
      refundStatus: 'Processed',
      amount: 299.99
    },
    {
      id: 2,
      orderNumber: '#ORD-2024-003',
      cancelDate: '2024-03-15',
      reason: 'Item was defective',
      refundStatus: 'Pending',
      amount: 199.49
    }
  ];

  return (
    <div className="user-cancelled-container">
      
      <div className="orders-list">
        {cancelledOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <XCircle className="icon" />
                <span className="order-number">{order.orderNumber}</span>
              </div>
              <span className="cancel-date">Cancelled on {order.cancelDate}</span>
            </div>
            
            <div className="order-details">
              <div className="detail-row">
                <span className="label">Reason:</span>
                <span className="value">{order.reason}</span>
              </div>
              
              <div className="detail-row">
                <span className="label">Refund Status:</span>
                <span className={`refund-status ${order.refundStatus === 'Processed' ? 'processed' : 'pending'}`}>
                  {order.refundStatus}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">${order.amount}</span>
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
