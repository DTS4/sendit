import React, { useEffect, useState } from "react";
import axios from "axios"; // For API calls
import { toast } from "react-toastify"; // Import toast for notifications
import "../../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]); // State to store all orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://sendit-backend-j83j.onrender.com/parcels"
      );

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid response format from server");
      }

      // Sort orders by status priority: Pending > In Transit > Delivered > Cancelled
      const sortedOrders = response.data.sort((a, b) => {
        const statusPriority = {
          Pending: 1,
          In_Transit: 2,
          Delivered: 3,
          Cancelled: 4,
        };

        return statusPriority[a.status] - statusPriority[b.status];
      });

      setOrders(sortedOrders); // Set the fetched and sorted orders
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setError(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount and poll every 10 seconds
  useEffect(() => {
    fetchOrders();

    // Polling every 10 seconds for real-time updates
    const intervalId = setInterval(fetchOrders, 10000);

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  // Function to handle status update by admin
  const handleStatusUpdate = async (parcelId, newStatus) => {
    try {
      const confirmUpdate = window.confirm(
        `Are you sure you want to update the status to "${newStatus}"?`
      );
      if (!confirmUpdate) return;

      // Normalize the status value
      const normalizedStatus = newStatus.replace(" ", "").toLowerCase();

      const response = await axios.post(
        `https://sendit-backend-j83j.onrender.com/parcels/${parcelId}/update_status`,
        { status: normalizedStatus }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === parcelId ? { ...order, status: newStatus } : order
          )
        );

        toast.success(`Status updated to "${newStatus}" successfully!`, {
          autoClose: 3000,
        });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      let errorMessage = error.message;
      if (error.response && error.response.data) {
        errorMessage =
          error.response.data.message || error.response.data.error || error.message;
      }
      console.error("Error updating status:", errorMessage);

      toast.error(`Failed to update status: ${errorMessage}`, { autoClose: 5000 });
    }
  };

  // Function to handle deleting the order from the frontend
  const handleDeleteOrder = (parcelId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== parcelId));

    toast.success("Order deleted successfully!", { autoClose: 3000 });
  };

  if (loading) return <p className="loading-state">Loading orders...</p>;
  if (error) return <p className="error-state">Error: {error}</p>;

  return (
    <div className="admin-orders-container">
      <h1 className="admin-orders-title">Orders</h1>

      {/* Orders Table */}
      <div className="admin-orders-card">
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Tracking ID</th>
              <th>Items</th>
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
                <td data-label="Order ID">{order.id}</td>
                <td data-label="Customer">{order.user_id}</td>
                <td data-label="Tracking ID">{order.tracking_id}</td>
                <td data-label="Items">{order.description || "N/A"}</td>
                <td data-label="Pickup Location">{order.pickup_location}</td>
                <td data-label="Destination">{order.destination}</td>
                <td data-label="Distance (km)">{order.distance}</td>
                <td data-label="Weight (kg)">{order.weight}</td>
                <td data-label="Status">
                  <span
                    className={`status-badge ${getStatusClass(order.status)}`}
                    data-tooltip={order.status}
                  >
                    {order.status}
                  </span>
                </td>
                <td data-label="Actions">
                  <div className="actions-container">
                    {/* Update Status Buttons */}
                    <button
                      className="admin-status-button"
                      onClick={() => handleStatusUpdate(order.id, "In_Transit")}
                      disabled={order.status !== "Pending"}
                    >
                      In Transit
                    </button>
                    <button
                      className="admin-status-button delivered"
                      onClick={() => handleStatusUpdate(order.id, "Delivered")}
                      disabled={["Delivered", "Cancelled"].includes(order.status)}
                    >
                      Delivered
                    </button>

                    {/* Delete Button */}
                    <button
                      className="admin-delete-button"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </div>
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