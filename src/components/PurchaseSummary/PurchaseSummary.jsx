import React, { useState, useEffect } from 'react';
import './PurchaseSummary.css';
import { SERVER_URL } from '../../config';
import { useNavigate } from 'react-router-dom';


export default function PurchaseSummary() {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [location, setLocation] = useState('Center');
  const [cartItems, setCartItems] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch(`${SERVER_URL}/shopping-cart/${username}`)
      .then(res => res.json())
      .then(data => {
        console.log("Cart data:", data);
        setCartItems(data);
      })
      .catch(err => console.error('Failed to fetch cart data:', err));
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="purchase-summary-page">
      <div className="purchase-summary-container">
        <h1 className="main-title">Purchase Summary</h1>

        <div className="order-details">
          <h3>Order Details</h3>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={item.image ? `data:image/jpeg;base64,${item.image}` : '/default-image.jpg'}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p className="cart-item-price">${parseFloat(item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
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

        <button className="confirm-btn" onClick={() => navigate('/order-confirm')}>Confirm Order</button>
      </div>

      <button className="home-button" onClick={() => navigate('/customer-home')}>Return to Home</button>
    </div>
  );
}


