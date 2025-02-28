import React, { useState } from 'react';

const UserNewOrder = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="order-container">
      <h2 className="order-title">Create New Order</h2>

      <div className="order-box">
        {step === 1 && (
          <div className="order-section">
            <h3 className="section-title"></h3>
            {/* Add order form */}
          </div>
        )}

        <button className="create-order-button" onClick={()  => console.log('Order Created')}>
          Create Order
        </button>
      </div>
    </div>
  );
};

export default UserNewOrder;
