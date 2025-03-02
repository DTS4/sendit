import React, { useState } from 'react';
import { Package2, MapPin, Clock, Info, Truck, CheckCircle2 } from 'lucide-react';

const initialParcelDetails = {
  pickup_location: '', // Changed to snake_case
  destination: '',
  weight: '',
  description: '',
  delivery_speed: 'standard', // Changed to snake_case
};

export default function App() {
  const [parcelDetails, setParcelDetails] = useState(initialParcelDetails);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    try {
      // Log the request payload for debugging
      console.log('Request payload:', parcelDetails);

      const response = await fetch('https://sendit-backend-j83j.onrender.com/parcels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // ✅ Fixed syntax
        },
        body: JSON.stringify(parcelDetails),
      });
      
      // Read the response body only once
      const responseData = await response.text(); // Read as text first

      let data;
      try {
        // Attempt to parse the response as JSON
        data = JSON.parse(responseData);
      } catch (jsonError) {
        // If the response is not JSON, handle it as an HTML error page
        console.error('Non-JSON response:', responseData);

        // Extract the error message from the HTML <p> tag
        const errorMessage = responseData.match(/<p>(.*?)<\/p>/)?.[1] || 'Server error: Invalid response format';
        throw new Error(errorMessage);
      }

      // Log the response data for debugging
      console.log('Response data:', data);

      // Check if the response is OK (status code 2xx)
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      // Reset the form and show success message
      setShowConfirmation(false);
      setParcelDetails(initialParcelDetails);
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParcelDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <div className="container">
      <div className="layout-wrapper">
        {/* Form Section */}
        <div className="form-section">
          <div className="card">
            <div className="header">
              <Package2 className="header-icon" />
              <h1 className="header-title"></h1>

              {/* <div className="header-icons">
          <button className="notification-button">
            <Bell className="notification-icon" />
            <span className="notification-badge">3</span>
          </button>
          </div> */}


              <div className="user-info">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
              className="user-avatar"
            />
            <span className="user-name">Bobb</span>
          </div>

            </div>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <MapPin className="form-label-icon" />
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickup_location" // Changed to snake_case
                    value={parcelDetails.pickup_location}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter pickup address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MapPin className="form-label-icon" />
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={parcelDetails.destination}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter destination address"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Info className="form-label-icon" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={parcelDetails.weight}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter parcel weight"
                    required
                    min="0.1"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Clock className="form-label-icon" />
                    Delivery Speed
                  </label>
                  <select
                    name="delivery_speed" // Changed to snake_case
                    value={parcelDetails.delivery_speed}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="standard">Standard (2-3 days)</option>
                    <option value="express">Express (1-2 days)</option>
                    <option value="same-day">Same Day Delivery</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Package2 className="form-label-icon" />
                  Parcel Description
                </label>
                <textarea
                  name="description"
                  value={parcelDetails.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe your parcel contents"
                  rows={3}
                  required
                />
              </div>

              <button type="submit" className="button button-primary button-full">
                <Truck className="w-5 h-5" />
                Create Order
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.95373531531664!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a6e9f4b5a5!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633033456789!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '1rem' }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <CheckCircle2 className="modal-icon" />
              <h2 className="modal-title">Confirm Your Order</h2>
            </div>

            <div className="modal-content">
              <div className="modal-grid">
                <div className="modal-field">
                  <p className="modal-label">Pickup Location</p>
                  <p className="modal-value">{parcelDetails.pickup_location}</p>
                </div>
                <div className="modal-field">
                  <p className="modal-label">Destination</p>
                  <p className="modal-value">{parcelDetails.destination}</p>
                </div>
                <div className="modal-field">
                  <p className="modal-label">Weight</p>
                  <p className="modal-value">{parcelDetails.weight} kg</p>
                </div>
                <div className="modal-field">
                  <p className="modal-label">Delivery Speed</p>
                  <p className="modal-value">{parcelDetails.delivery_speed}</p>
                </div>
              </div>
              <div className="modal-field">
                <p className="modal-label">Description</p>
                <p className="modal-value">{parcelDetails.description}</p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={handleConfirmOrder}
                className="button button-success modal-button"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm Order'}
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="button button-secondary modal-button"
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
