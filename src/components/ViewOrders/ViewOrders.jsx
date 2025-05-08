import React, { useEffect, useState } from 'react';
import './ViewOrders.css';
import { SERVER_URL } from '../../config';
import axios from 'axios';

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
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/all-orders`);
        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const applyFilters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SERVER_URL}/filtered-orders`, {
        params: {
          status: statusFilter || undefined,
          priceRange: priceFilter || undefined,
          username: usernameFilter || undefined,
        },
      });
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error applying filters:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-orders-container">
      <h1>View Orders</h1>

      <div className="filter-bar">
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="canceled">Canceled</option>
        </select>

        <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
          <option value="">All Prices</option>
          <option value="1">Under $50</option>
          <option value="2">$50 - $99</option>
          <option value="3">$100 - $199</option>
          <option value="4">$200 and above</option>
        </select>

        <input
          type="text"
          placeholder="UserName"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
        />
        <button onClick={applyFilters}>&#10003;</button>
      </div>

      <div className="orders-list">
        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString('he-IL')}</p>
              <p><strong>Total sum:</strong> ${order.sum_of_purchase}</p>
              <p><strong>Number of Products:</strong> {order.number_of_products}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Username:</strong> {order.username}</p>

              <div className="order-actions">
                <button className="cancel-btn" onClick={() => handleCancel(order.id)}>Cancel</button>
                <button className="approve-btn" onClick={() => handleApprove(order.id)}>Confirm</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}