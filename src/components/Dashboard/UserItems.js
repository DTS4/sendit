import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import axios from 'axios';
import '../../styles/UserItems.css';

const UserItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to generate an image using an external API (e.g., DALL·E)
  const generateImage = async (productName) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations', // DALL·E API endpoint
        {
          prompt: `A high-quality image of ${productName}`, // Use the product name as the prompt
          n:1, // Number of images to generate
          size: '256x256', // Image size
        },
        {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your API key
            'Content-Type': 'application/json',
          },
        }
      );

      // Return the generated image URL
      return response.data.data[0].url;
    } catch (err) {
      console.error('Error generating image:', err);
      return '/data:image/jpeg;base64,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'; // Fallback to a default image
    }
  };

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

        // Generate images for each item
        const itemsWithImages = await Promise.all(
          fetchedItems.map(async (item) => {
            const imageUrl = await generateImage(item.name);
            return { ...item, image_url: imageUrl };
          })
        );

        setItems(itemsWithImages);
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserItems;