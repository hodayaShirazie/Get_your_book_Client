import React, { useEffect, useState } from 'react';
import './ViewOrders.css';
import { SERVER_URL } from '../../config';


const handleCancel = async (orderId) => {
    try {
      const res = await fetch(`${SERVER_URL}/update-order-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'canceled' }),
      });
  
      if (!res.ok) throw new Error('Failed to cancel order');
  
      const updatedOrder = await res.json();
      console.log('Order cancelled:', updatedOrder);
    } catch (err) {
      console.error('Error cancelling order:', err);
    }
  };
  
  const handleApprove = async (orderId) => {
    try {
      const res = await fetch(`${SERVER_URL}/update-order-status/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });
  
      if (!res.ok) throw new Error('Failed to approve order');
  
      const updatedOrder = await res.json();
      console.log('Order approved:', updatedOrder);
    } catch (err) {
      console.error('Error approving order:', err);
    }
  };

  

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/all-orders`);
        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="view-orders-container">
      <h1>View Orders</h1>

      <div className="filter-bar">
        <select>
          <option>Status</option>
        </select>
        <select>
          <option>Price</option>
        </select>
        <input type="text" placeholder="Date" />
        <input type="text" placeholder="UserName" />
        <button>&#10003;</button>
      </div>

      <div className="orders-list">
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>

              <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
              <p><strong>Total sum:</strong> ${order.sum_of_purchase}</p>
              <p><strong>Number of Products:</strong> {order.number_of_products}</p>

              <div className="order-actions">
                <button className="cancel-btn" onClick={() => handleCancel(order.id)}>Cancel</button>
                <button className="approve-btn"  onClick={() => handleApprove(order.id)}>Confirm</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
