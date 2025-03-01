// import React from 'react';
// //import './UserReceived.css';

// const UserReceived = () => {
//   const receivedOrders = [
//     {
//       id: 1,
//       orderNumber: '#ORD-2024-001',
//       receivedDate: '2024-03-10',
//       items: [
//         { name: 'Wireless Headphones', quantity: 1 },
//         { name: 'Smart Watch', quantity: 1 }
//       ],
//       total: 499.98
//     },
//     // Add more received orders
//   ];

//   return (
//     <div className="received-container">
//       <h2 className="received-title">Received Orders</h2>

//       <div className="received-orders">
//         {receivedOrders.map((order) => (
//           <div key={order.id} className="order-card">
//             <div className="order-header">
//               <div className="order-info">
//                 <span className="check-icon">✔</span>
//                 <span className="order-number">{order.orderNumber}</span>
//               </div>
//               <span className="received-date">Received on {order.receivedDate}</span>
//             </div>

//             <div className="order-items">
//               {order.items.map((item, index) => (
//                 <div key={index} className="order-item">
//                   <span className="item-name">{item.name}</span>
//                   <span className="item-quantity">x{item.quantity}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="order-footer">
//               <span className="order-total">Total: ${order.total}</span>
//               <button className="view-details">View Details</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserReceived;
