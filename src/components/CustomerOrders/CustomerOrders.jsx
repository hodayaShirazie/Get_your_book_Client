import React, { useEffect, useState } from 'react';
import './CustomerOrders.css';
import { SERVER_URL } from '../../config';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/user-orders/${username}`);
        if (!response.ok) throw new Error('Failed to fetch user orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (username) {
      fetchOrders();
    }
  }, [username]);

  const handleCancel = async (order) => {
    if (!order.id) {
      alert("Order ID is missing.");
      return;
    }

    try {
      const canCancelResponse = await fetch(`${SERVER_URL}/can-cancel-order/${order.id}`);
      const responseText = await canCancelResponse.text();  

      if (!canCancelResponse.ok) {
        console.error("Failed to check if order can be cancelled:", responseText);
        alert(responseText || "Failed to check if order can be cancelled.");
        return;
      }

      const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
      if (!confirmCancel) return;

      const response = await fetch(`${SERVER_URL}/cancel-order/${order.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOrders(prev => prev.filter(o => o.id !== order.id));
        setShowSuccess(true); 
      } else {
        const msg = await response.text();
        setShowError(true); 
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setShowError(true);
    }
  };

  return (
    <div className="orders-background">
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-box">
              <div className="order-info">
                <p><strong>Order Number:</strong> {order.id}</p>
                <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.sum_of_purchase}</p>
                <p><strong>Products in Order:</strong> {order.number_of_products}</p>
                {order.products?.length > 0 && (
                  <ul className="product-list">
                    {order.products.map((product, index) => (
                      <li key={index}>
                        {product.name} - ${product.price} x {product.quantity}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                className="cancel-button"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowModal(true);
                }}
              >
                Cancel Order
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal for cancel confirmation */}
      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to cancel order #{selectedOrder.id}?</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={() => handleCancel(selectedOrder)}>Yes</button>
              <button className="modal-cancel-button" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Your order has been cancelled successfully!</p>
            <button className="modal-cancel-button" onClick={() => setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Error message */}
      {showError && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Sorry, you cannot cancel this order as more than an hour has passed.</p>
            <button className="modal-cancel-button" onClick={() => setShowError(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default MyOrders;
