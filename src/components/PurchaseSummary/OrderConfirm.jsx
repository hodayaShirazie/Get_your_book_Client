import React from 'react';
import './OrderConfirm.css';
import { useNavigate } from 'react-router-dom';



export default function OrderConfirmation() {
    const navigate = useNavigate();
  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h2>Your order has been placed successfully!</h2>

        <div className="order-section">
          <p><strong>Order Number:</strong> #123456</p>

          <p><strong>Items Ordered:</strong></p>
          <p>Book A - $19.99</p>
          <p>Book B - $29.99</p>

          <p className="total"><strong>Total:</strong> $49.98</p>

          <p><strong>Delivery Information:</strong></p>
          <p><strong>Method:</strong> Home Delivery</p>
          <p><strong>Address:</strong> 123 Green St, Tel Aviv</p>
          <p><strong>Delivery Date:</strong> 2025-04-30</p>
          <p><strong>Time Slot:</strong> Afternoon</p>
        </div>

      </div>
      <button className="home-button" onClick={() => navigate('/customer-home')}>Return to Home</button>
    </div>
  );
}
