import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import axios from 'axios';  // Import axios for API calls
import '../../styles/UserItems.css'; // Import the CSS file

const UserItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Replace this URL with your backend endpoint
        const response = await axios.get('https://sendit-backend-j83j.onrender.com');
        setItems(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="items-container">
      <h2 className="title">My Items</h2>

      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <div className="rating">
                <Star className="star-icon" />
                <span className="rating-value">{item.rating}</span>
              </div>
              <p className="price">${item.price}</p>
              <p className="purchase-date">Purchased on {item.purchaseDate}</p>
              <div className="buttons">
                <button className="buy-again">Buy Again</button>
                <button className="review">Review</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserItems;