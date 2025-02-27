import React, { useState } from 'react';
//import './UserNewOrder.css';

const UserNewOrder = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="order-container">
      <h2 className="order-title">Create New Order</h2>

      <div className="steps-container">
        {[1, 2, 3].map((number) => (
          <React.Fragment key={number}>
            <div className={`step ${step >= number ? 'active' : ''}`}>
              <div className="step-number">{number}</div>
              <span className="step-label">
                {/* {number === 1 ? 'Select Items' : number === 2 ? 'Shipping' : 'Payment'} */}
              </span>
            </div>
            {number < 3 && <div className={`step-line ${step > number ? 'active-line' : ''}`}></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="order-box">
        {step === 1 && (
          <div className="order-section">
            {/* <h3 className="section-title">Select Items</h3> */}
            {/* Add item selection form */}
          </div>
        )}

        {step === 2 && (
          <div className="order-section">
            {/* <h3 className="section-title">Shipping Information</h3> */}
            {/* Add shipping form */}
          </div>
        )}

        {step === 3 && (
          <div className="order-section">
            <h3 className="section-title">CreateNewOrder</h3>
            {/* Add payment form */}
          </div>
        )}

        <div className="order-buttons">
          {step > 1 && (
             <button className="back-button" onClick={() => setStep(step - 1)}>
               Back
             </button>
          )}
          <button className="next-button" onClick={() => step < 3 ? setStep(step + 1) : null}>
            {step === 3 ? 'Create Order' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserNewOrder;
