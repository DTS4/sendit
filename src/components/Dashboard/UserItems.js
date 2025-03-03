import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import axios from 'axios';  
import '../../styles/UserItems.css'; 

const UserItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://sendit-backend-j83j.onrender.com/user/items', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const fetchedItems = Array.isArray(response.data) ? response.data : [];
        console.log('Fetched items:', fetchedItems);
        setItems(fetchedItems);
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
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <img 
              src={item.image_url || '/default-image.jpg'} 
              alt={item.name} 
              className="item-image" 
            />
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <div className="rating">
                <Star className="star-icon" />
                <span className="rating-value">{item.rating || 'N/A'}</span>
              </div>
              <p className="price">${item.price}</p>
              <p className="purchase-date">
                Purchased on {new Date(item.purchase_date).toLocaleDateString()}
              </p>
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