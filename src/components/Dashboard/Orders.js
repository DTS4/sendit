import React, { useEffect, useState } from "react";
import axios from "axios"; // For API calls
import "../../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to store all orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://sendit-backend-j83j.onrender.com/parcels"
        );

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response format from server");
        }

        setOrders(response.data); // Set the fetched orders
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setError(error.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle status update by admin
  const handleStatusUpdate = async (parcelId, newStatus) => {
    try {
      const confirmUpdate = window.confirm(
        `Are you sure you want to update the status to "${newStatus}"?`
      );
      if (!confirmUpdate) return;
  
      // Normalize the status value
      const normalizedStatus = newStatus
        .replace(" ", "") // Remove spaces
        .toLowerCase(); // Convert to lowercase
  
      console.log("Sending update request:", { parcelId, status: normalizedStatus });
  
      const response = await axios.post(
        `https://sendit-backend-j83j.onrender.com/parcels/${parcelId}/update_status`,
        { status: normalizedStatus }
      );
  
      console.log("Response from server:", response.data);
  
      if (response.status === 200) {
        alert("Status updated successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === parcelId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      let errorMessage = error.message;
      if (error.response && error.response.data) {
        console.error("Full error response:", error.response.data); // Debugging
        errorMessage = error.response.data.message || error.response.data.error || error.message;
      }
      console.error("Error updating status:", errorMessage);
      alert(`Failed to update status: ${errorMessage}`);
    }
  };

  // Function to handle hiding the order (removing it from the UI)
  const handleHideOrder = (parcelId) => {
    const confirmHide = window.confirm(
      "Are you sure you want to hide this order?"
    );
    if (!confirmHide) return;

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== parcelId)
    );
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-orders-container">
      <h1 className="admin-orders-title">Admin Orders</h1>

      {/* Orders Table */}
      <div className="admin-orders-card">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Tracking ID</th>
              <th>Pickup Location</th>
              <th>Destination</th>
              <th>Distance (km)</th>
              <th>Weight (kg)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="admin-order-row">
                <td>{order.id}</td>
                <td>{order.user_id}</td>
                <td>{order.tracking_id}</td>
                <td>{order.pickup_location}</td>
                <td>{order.destination}</td>
                <td>{order.distance}</td>
                <td>{order.weight}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  {/* Update Status Buttons */}
                  <button
                    className="admin-status-button"
                    onClick={() => handleStatusUpdate(order.id, "In_Transit")}
                    disabled={order.status !== "Pending"} // Only enable if status is "Pending"
                  >
                    In Transit
                  </button>
                  <button
                    className="admin-status-button"
                    onClick={() => handleStatusUpdate(order.id, "Delivered")}
                    disabled={["Delivered", "Cancelled"].includes(order.status)}
                  >
                    Delivered
                  </button>

                  {/* Hide Button for Delivered or Cancelled Orders */}
                  {["Delivered", "Cancelled"].includes(order.status) && (
                    <button
                      className="admin-hide-button"
                      onClick={() => handleHideOrder(order.id)}
                    >
                     Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to get CSS class for status badges
const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "status-pending";
    case "In_Transit":
      return "status-in-transit";
    case "Delivered":
      return "status-delivered";
    case "Cancelled":
      return "status-cancelled";
    default:
      return "";
  }
};

export default Orders;