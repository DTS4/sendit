import React from 'react';
import { CheckCircle, Star } from 'lucide-react';


const UserDelivered = () => {
  const deliveredOrders = [
    {
      id: 1,
      orderNumber: '#ORD-2024-004',
      deliveryDate: '2024-03-14',
      items: [
        { name: 'Wireless Earbuds', quantity: 1, reviewed: false },
        { name: 'Phone Case', quantity: 2, reviewed: true }
      ],
      total: 159.97,
      deliveryAddress: '123 Main St, New York, NY 10001'
    },
    // Add more delivered orders
  ];

  return (
    <div className="delivered-container">
      <h2 className="delivered-title">Delivered Orders</h2>
      
      <div className="delivered-list">
        {deliveredOrders.map((order) => (
          <div key={order.id} className="delivered-card">
            <div className="delivered-header">
              <div className="order-info">
                <CheckCircle className="icon-green" />
                <span className="order-number">{order.orderNumber}</span>
              </div>
              <span className="delivery-date">Delivered on {order.deliveryDate}</span>
            </div>
            
            <div className="delivered-details">
              <div>
                <p className="detail-label">Delivery Address</p>
                <p className="detail-value">{order.deliveryAddress}</p>
              </div>
              
              <div className="items-section">
                <h4 className="items-title">Items</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    {!item.reviewed ? (
                      <button className="review-button">
                        <Star className="icon-yellow" />
                        Review
                      </button>
                    ) : (
                      <span className="reviewed-text">Reviewed</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="total-section">
                <span className="total-amount">Total: ${order.total}</span>
                <button className="view-details-button">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDelivered;
