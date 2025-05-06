import React, { useState, useEffect } from 'react';
import './PurchaseSummary.css';

import { SERVER_URL } from '../../config'; 


export default function PurchaseSummary() {
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [location, setLocation] = useState('Center');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/api/cart') // שימי כאן את המסלול המתאים
      .then(res => res.json())
      .then(data => setCartItems(data))
      .catch(err => console.error('Failed to fetch cart data:', err));
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="purchase-summary-page">
      <div className="purchase-summary-container">
        <h1 className="main-title">Purchase Summary</h1>

        <div className="order-details">
          <h3>Order Details</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Qty: {item.quantity} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="total-price"><strong>Total: ${calculateTotal()}</strong></p>
        </div>

        <div className="section delivery-box">
          <h3>Delivery Method</h3>
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                name="delivery"
                checked={deliveryMethod === 'home'}
                onChange={() => setDeliveryMethod('home')}
              />
              Home Delivery
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                checked={deliveryMethod === 'pickup'}
                onChange={() => setDeliveryMethod('pickup')}
              />
              Pickup Point
            </label>
          </div>

          {deliveryMethod === 'pickup' ? (
            <>
              <label className="input-label">Choose Location:</label>
              <select
                className="input-field"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Center</option>
                <option>North</option>
                <option>South</option>
              </select>
            </>
          ) : (
            <>
              <label className="input-label">
                City<span className="required-star">*</span>
              </label>
              <input className="input-field" type="text" required />

              <label className="input-label">
                Street<span className="required-star">*</span>
              </label>
              <input className="input-field" type="text" required />

              <label className="input-label">
                House Number<span className="required-star">*</span>
              </label>
              <input className="input-field" type="text" required />

              <label className="input-label">
                Phone Number<span className="required-star">*</span>
              </label>
              <input className="input-field" type="text" required />

              <button className="confirm-btn">Confirm Delivery Info</button>
            </>
          )}
        </div>

        <div className="section">
          <h3>Delivery Date</h3>
          <label className="input-label">
            Date<span className="required-star">*</span>
          </label>
          <input className="input-field" type="date" required />

          <label className="input-label">
            Select Time Slot<span className="required-star">*</span>
          </label>
          <select className="input-field" required>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

        <button className="confirm-btn">Confirm Order</button>
      </div>

      <button className="home-button">Return to Home</button>
    </div>
  );
}
