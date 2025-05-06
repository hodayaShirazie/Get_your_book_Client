import React from 'react';
import './OrderConfirm.css';

export default function MyOrders() {
  const orders = [
    {
      id: '123457',
      date: '2025-04-22',
      total: '$74.97',
      products: ['Book A', 'Book B', 'Book C']
    },
    {
      id: '123456',
      date: '2025-04-15',
      total: '$49.98',
      products: ['Book D', 'Book E']
    }
  ];

  const handleCancel = (orderId) => {
    alert(`Cancel order ${orderId}`);
  };

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>

        {orders.map((order) => (
          <div className="order-box" key={order.id}>
            <div className="order-details">
              <p><strong>Order Number:</strong> #{order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> {order.total}</p>
              <p><strong>Products in Order:</strong> {order.products.length}</p>
              <ul>
                {order.products.map((product, idx) => (
                  <li key={idx}>{product}</li>
                ))}
              </ul>
            </div>
            <button className="cancel-btn" onClick={() => handleCancel(order.id)}>
              Cancel Order
            </button>
            <hr />
          </div>
        ))}

        <button className="home-btn">Return to Home</button>
      </div>
    </div>
  );
}