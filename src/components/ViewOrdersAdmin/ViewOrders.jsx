import React, { useEffect, useState } from 'react';
import './ViewOrders.css';
import { SERVER_URL } from '../../config';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';
import axios from 'axios';


export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); 
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [infoModal, setInfoModal] = useState({ show: false, message: '' });

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
  const handleConfirmAction = async () => {
    if (!selectedOrderId || !selectedAction) return;
  
    const statusToSet = selectedAction === 'approve' ? 'approved' : 'canceled';
  
    try {
      const res = await fetch(`${SERVER_URL}/update-order-status/${selectedOrderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusToSet }),
      });
  
      if (!res.ok) throw new Error('Update failed');
  
      const updatedOrder = await res.json();
  
      setOrders(prev =>
        prev.map(order =>
          order.id === selectedOrderId ? { ...order, status: statusToSet } : order
        )
      );
  
      setFilteredOrders(prev =>
        prev.map(order =>
          order.id === selectedOrderId ? { ...order, status: statusToSet } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    } finally {
      setShowModal(false);
      setSelectedOrderId(null);
      setSelectedAction(null);
    }
  };
  

  return (
    <div className="orders-bg">
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
                  <button
                    className="cancel-btn"
                    onClick={() => {
                      if (order.status === 'canceled') {
                        setInfoModal({ show: true, message: 'The order is already canceled.' });
                        return;
                      }
                      setSelectedOrderId(order.id);
                      setSelectedAction('cancel');
                      setShowModal(true);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="approve-btn"
                    onClick={() => {
                      if (order.status === 'approved') {
                        setInfoModal({ show: true, message: 'The order is already approved.' });
                        return;
                      }
                      setSelectedOrderId(order.id);
                      setSelectedAction('approve');
                      setShowModal(true);
                    }}
                  >
                    Confirm
                  </button>

                </div>
              </div>
            ))
          )}
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-box">
              <p>
                Are you sure you want to {selectedAction === 'approve' ? 'approve' : 'cancel'} this order?
              </p>
              <div className="modal-buttons">
                <button className="confirm-button" onClick={handleConfirmAction}>Yes</button>
                <button
                  className="modal-cancel-button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOrderId(null);
                    setSelectedAction(null);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {infoModal.show && (
          <div className="modal-overlay">
            <div className="modal-box">
              <p>{infoModal.message}</p>
              <button
                className="modal-cancel-button"
                onClick={() => setInfoModal({ show: false, message: '' })}
              >
                OK
              </button>
            </div>
          </div>
        )}

        <BackToHomeButton />
      </div>
      </div>
    );
}

