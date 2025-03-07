import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify"; // Import toast for notifications
import '../../styles/UserOrders.css';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedDestination, setUpdatedDestination] = useState("");

  const API_BASE_URL = "https://sendit-backend-j83j.onrender.com/parcels";

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        console.log("Fetched orders:", data);

        // Ensure all dates are valid
        const validatedOrders = data.map((order) => ({
          ...order,
          date: order.date ? new Date(order.date).toISOString() : new Date().toISOString(),
        }));

        // Sort orders by status priority and then by creation time (latest first)
        const sortedOrders = validatedOrders.sort((a, b) => {
          const statusPriority = {
            Pending: 1,
            In_Transit: 2,
            Delivered: 3,
            Cancelled: 4,
          };

          // Compare by status priority first
          if (statusPriority[a.status] !== statusPriority[b.status]) {
            return statusPriority[a.status] - statusPriority[b.status];
          }

          // If statuses are the same, sort by creation time (latest first)
          return new Date(b.date) - new Date(a.date);
        });

        setOrders(sortedOrders);
        setTotalOrders(sortedOrders.length);
        setMonthlyOrders(
          sortedOrders.filter(
            (order) => new Date(order.date).getMonth() === new Date().getMonth()
          ).length
        );
        setTotalSpent(sortedOrders.reduce((total, order) => total + (order.cost || 0), 0));
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle order cancellation
  const handleCancelOrder = useCallback(async (orderId) => {
    const confirmCancellation = window.confirm(
      "Are you sure you want to cancel this order? This action cannot be undone."
    );
    if (!confirmCancellation) return;

    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );

      toast.success("Order cancelled successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error(`Failed to cancel order: ${error.message}`, { autoClose: 5000 });
    }
  }, []);

  // Function to handle order update (destination only)
  const handleUpdateOrder = useCallback(async () => {
    if (!selectedOrder || !updatedDestination.trim()) {
      toast.error("Please provide a valid destination.", { autoClose: 3000 });
      return;
    }

    if (updatedDestination.length < 3 || updatedDestination.length > 100) {
      toast.error("Destination must be between 3 and 100 characters.", { autoClose: 3000 });
      return;
    }

    try {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, destination: updatedDestination } : order
        )
      );

      handleCloseModal();

      toast.success("Order updated successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error(`Failed to update order: ${error.message}`, { autoClose: 5000 });
    }
  }, [selectedOrder, updatedDestination]);

  // Function to handle order deletion (frontend-only)
  const handleDeleteOrder = useCallback((orderId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this order? This action cannot be undone."
    );
    if (!confirmDeletion) return;

    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

    toast.success("Order deleted successfully!", { autoClose: 3000 });
  }, []);

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setUpdatedDestination("");
  };

  if (loading) return <p className="loading-state">Loading orders...</p>;
  if (error) return <p className="error-state">Error: {error}</p>;

  return (
    <div className="orders-container">
      <h1 className="orders-title">All Orders</h1>

      {/* Order Summary */}
      <div className="order-summary">
        <div className="summary-card">
          <div className="summary-icon summary-blue">📦</div>
          <div className="summary-info">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon summary-purple">💰</div>
          <div className="summary-info">
            <h3>Total Spent</h3>
            <p>${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Items</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td data-label="Order #">{order.tracking_id}</td>
                <td data-label="Items">{order.description || "N/A"}</td>
                <td data-label="Date">
                  {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                </td>
                <td data-label="Status">
                  <span
                    className={`order-status ${getStatusClass(order.status)}`}
                    data-tooltip={order.status}
                  >
                    {order.status}
                  </span>
                </td>
                <td data-label="Amount">${order.cost?.toFixed(2) || "N/A"}</td>
                <td data-label="Destination">{order.destination}</td>
                <td data-label="Actions">
                  <div className="actions-container">
                    {order.status !== "Cancelled" && order.status !== "Delivered" && (
                      <>
                        <button
                          className="update-order"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Update
                        </button>
                        <button
                          className="cancel-order"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {(order.status === "Delivered" || order.status === "Cancelled") && (
                      <button
                        className="delete-order"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Updating Destination */}
      {selectedOrder && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-card"> {/* Added this div */}
        <h3>Update Order</h3>
        <input
          type="text"
          value={updatedDestination}
          onChange={(e) => setUpdatedDestination(e.target.value)}
          placeholder="Enter new destination"
        />
        <div className="modal-actions">
          <button onClick={handleUpdateOrder} className="modal-button">
            Update
          </button>
          <button onClick={handleCloseModal} className="modal-button">
            Cancel
          </button>
        </div>
      </div> {/* Close the .modal-card div */}
    </div>
  </div>
)}

    </div>
  );
};

// Function to get CSS class for status badges
const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "pending";
    case "In_Transit":
      return "in_transit";
    case "Delivered":
      return "delivered";
    case "Cancelled":
      return "cancelled";
    default:
      return "";
  }
};

export default UserOrders;