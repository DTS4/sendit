import React, { useState } from "react";
import styles from '../styles/CreateOrder.css';


const CreateOrder = () => {
  const [formData, setFormData] = useState({
    item: "",
    quantity: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order created:", formData);
    alert("Order created successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create New Order</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="item" className={styles.label}>Item Name</label>
          <input
            type="text"
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity" className={styles.label}>Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>Delivery Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="notes" className={styles.label}>Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
