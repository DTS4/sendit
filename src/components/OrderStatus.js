import React from "react";
import { CheckCircle, Clock, XCircle, Truck } from "lucide-react";
import styles from '../styles/CreateOrder.css'; // In OrderStatus.js

const StatusCard = ({ icon, label, count, colorClass }) => (
  <div className={`${styles.statusCard} ${styles[colorClass]}`}>
    <div className={styles.cardContent}>
      <div>
        <p className={styles.label}>{label}</p>
        <p className={styles.count}>{count}</p>
      </div>
      <div className={styles.icon}>{icon}</div>
    </div>
  </div>
);

const OrderStatus = () => {
  const statuses = [
    { icon: <Clock size={24} />, label: "In Transit", count: 12, colorClass: "blue" },
    { icon: <CheckCircle size={24} />, label: "Delivered", count: 48, colorClass: "green" },
    { icon: <Truck size={24} />, label: "Received", count: 8, colorClass: "yellow" },
    { icon: <XCircle size={24} />, label: "Cancelled", count: 2, colorClass: "red" },
  ];

  return (
    <div className={styles.gridContainer}>
      {statuses.map((status, index) => (
        <StatusCard key={index} {...status} />
      ))}
    </div>
  );
};

export default OrderStatus;
