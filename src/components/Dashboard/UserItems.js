import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
//import './UserItems.css'; // Import the CSS file

const UserItems = () => {
  const items = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      price: 199.99,
      rating: 4.5,
      purchaseDate: '2024-02-15'
    },
    // Add more items as needed
  ];

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
