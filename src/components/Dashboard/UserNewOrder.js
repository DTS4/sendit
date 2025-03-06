import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";

// Initial state for parcel details
const initialParcelDetails = {
  pickup_location: "",
  destination: "",
  weight: "",
  description: "",
  delivery_speed: "standard",
};

export default function App() {
  const [parcelDetails, setParcelDetails] = useState(initialParcelDetails);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState("");
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParcelDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Initialize the map only once when the component mounts
  useEffect(() => {
    if (!mapRef.current) {
      const osmMap = L.map("map", { zoomControl: false }).setView([0, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(osmMap);
      mapRef.current = osmMap;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Calculate distance using OSRM API
  const calculateDistance = async () => {
    try {
      const { pickup_location, destination } = parcelDetails;

      if (!pickup_location || !destination) {
        alert("Please enter both pickup and destination locations.");
        return;
      }

      const geocodeLocation = async (address) => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
          )}&format=json&limit=1`
        );
        const data = await response.json();
        if (!data.length) throw new Error(`Location not found: ${address}`);
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      };

      const pickupCoords = await geocodeLocation(pickup_location);
      const deliveryCoords = await geocodeLocation(destination);

      const osrmResponse = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${pickupCoords.lon},${pickupCoords.lat};${deliveryCoords.lon},${deliveryCoords.lat}?overview=false`
      );
      const osrmData = await osrmResponse.json();

      if (!osrmData.routes || osrmData.routes.length === 0) {
        throw new Error("Route could not be calculated");
      }

      const routeDistance = osrmData.routes[0].legs[0].distance / 1000;
      setDistance(routeDistance.toFixed(2));

      if (mapRef.current) {
        if (routingControlRef.current) {
          mapRef.current.removeControl(routingControlRef.current);
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(pickupCoords.lat, pickupCoords.lon),
            L.latLng(deliveryCoords.lat, deliveryCoords.lon),
          ],
          routeWhileDragging: false,
          createMarker: () => null,
        }).addTo(mapRef.current);

        const bounds = L.latLngBounds([
          [pickupCoords.lat, pickupCoords.lon],
          [deliveryCoords.lat, deliveryCoords.lon],
        ]);
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
      alert(`Failed to calculate distance: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateDistance();
    setTimeout(() => setShowConfirmation(true), 500);
  };

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://sendit-backend-j83j.onrender.com/parcels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...parcelDetails,
            distance,
          }),
        }
      );

      const rawResponse = await response.text();
      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (error) {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      setShowConfirmation(false);
      setParcelDetails(initialParcelDetails);
      setDistance("");
      alert("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      alert(`Failed to create order: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-order-container">
      {/* Form Section */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <h2>Create New Order</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>
                Pickup Location
                <input
                  type="text"
                  name="pickup_location"
                  value={parcelDetails.pickup_location}
                  onChange={handleInputChange}
                  placeholder="Enter pickup location"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Destination
                <input
                  type="text"
                  name="destination"
                  value={parcelDetails.destination}
                  onChange={handleInputChange}
                  placeholder="Enter destination"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Weight (kg)
                <input
                  type="number"
                  name="weight"
                  value={parcelDetails.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight"
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Delivery Speed
                <select
                  name="delivery_speed"
                  value={parcelDetails.delivery_speed}
                  onChange={handleInputChange}
                  required
                >
                  <option value="standard">Standard (2-3 days)</option>
                  <option value="express">Express (1-2 days)</option>
                  <option value="same_day">Same Day Delivery</option>
                </select>
              </label>
            </div>

            <div className="form-group full-width">
              <label>
                Parcel Description
                <textarea
                  name="description"
                  value={parcelDetails.description}
                  onChange={handleInputChange}
                  placeholder="Enter parcel description"
                />
              </label>
            </div>
          </div>

          <button type="submit" className="button button-primary">
            Create Order
          </button>
        </form>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <div id="map" style={{ height: "620px", width: "100%" }}>
          {/* Direction Card Inside Map */}
          <div className="direction-card">
            <h4>Route Details</h4>
            <p>Distance: {distance || "N/A"} km</p>
            <p>Estimated Time: {distance ? "20 minutes" : "N/A"}</p>
          </div>
        </div>
      </div>

      {showConfirmation && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Confirm Your Order</h3>
      <p>
        <strong>Pickup Location:</strong> {parcelDetails.pickup_location}
      </p>
      <p>
        <strong>Destination:</strong> {parcelDetails.destination}
      </p>
      <p>
        <strong>Distance:</strong> {distance} km
      </p>
      <p>
        <strong>Weight:</strong> {parcelDetails.weight} kg
      </p>
      <p>
        <strong>Delivery Speed:</strong> {parcelDetails.delivery_speed}
      </p>
      <p>
        <strong>Description:</strong> {parcelDetails.description}
      </p>

      <div className="modal-actions">
        <button
          onClick={handleConfirmOrder}
          className="modal-button button-primary"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Confirm Order"}
        </button>
        <button
          onClick={() => setShowConfirmation(false)}
          className="modal-button button-secondary"
        >
          Edit Order
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}