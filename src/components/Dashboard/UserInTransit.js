import React from 'react';
import { Truck, MapPin } from 'lucide-react';

const UserInTransit = () => {
  const inTransitOrders = [
    {
      id: 1,
      orderNumber: '#ORD-2024-003',
      estimatedDelivery: '2024-03-20',
      currentLocation: 'Distribution Center, New York',
      trackingNumber: 'TRK123456789',
      status: 'In Transit',
      updates: [
        { date: '2024-03-15', status: 'Package picked up' },
        { date: '2024-03-16', status: 'Arrived at sorting facility' }
      ]
    },
    // Add more in-transit orders
  ];

  return (
    <div className="in-transit-container">
      <h2 className="title">In Transit Orders</h2>

      <div className="orders-list">
        {inTransitOrders.map((order) => (
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
