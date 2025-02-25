import React from "react";
import { Package } from "lucide-react";
import styles from '../styles/RecentOrders.css'; // In RecentOrders.js 

const orders = [
  { id: "#ORD-001", item: "iPhone 15 Pro", date: "2024-03-15", status: "Delivered", amount: "$999" },
  { id: "#ORD-002", item: "MacBook Air", date: "2024-03-14", status: "In Transit", amount: "$1299" },
  { id: "#ORD-003", item: "AirPods Pro", date: "2024-03-13", status: "Received", amount: "$249" },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Delivered":
      return styles.green;
    case "In Transit":
      return styles.blue;
    case "Received":
      return styles.yellow;
    default:
      return "";
  }
};

const RecentOrders = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Orders</h2>
        <Package size={24} className={styles.icon} />
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Order ID</th>
              <th>Item</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={styles.tableRow}>
                <td>{order.id}</td>
                <td>{order.item}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
