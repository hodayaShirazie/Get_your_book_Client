import React, { useEffect, useState } from 'react';
import './CustomerOrders.css';
import { SERVER_URL } from '../../config';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
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

  const checkIfCanCancel = async (order) => {
    if (!order.id) {
      setShowError(true);
      return;
    }
  
    try {
      const canCancelResponse = await fetch(`${SERVER_URL}/can-cancel-order/${order.id}`);
  
      const responseText = await canCancelResponse.text(); 
  
      if (!canCancelResponse.ok) {
        if (responseText === "Cannot cancel after one hour.") {
          console.log("Order cannot be cancelled: Cannot cancel after one hour.");
          setShowError(true);
          setErrorMessage("Order cannot be cancelled after one hour");
        } else {
          console.log("Bad request:", responseText);
          setShowError(true);
          setErrorMessage("There was an issue processing your request.");
        }
        return; 
      }
  
      if (responseText === "Order can be cancelled.") {
        setSelectedOrder(order);
        setShowModal(true);
      } else {
        console.log("Server says cannot cancel:", responseText);
        setShowError(true);
        setErrorMessage("This order cannot be cancelled.");
      }
    } catch (error) {
      console.error("Error checking if order can be cancelled:", error);
      setShowError(true);
      setErrorMessage("An error occurred while processing your request.");
    }
  };
  
  

  const handleCancelConfirmed = async () => {
    if (!selectedOrder?.id) {
      setErrorMessage("Order ID is missing.");
      setShowError(true);
      setShowModal(false);
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/cancel-order/${selectedOrder.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOrders(prev => prev.filter(o => o.id !== selectedOrder.id));
        setShowSuccess(true);
      } else {
        const msg = await response.text();
        setErrorMessage(msg || "Failed to cancel the order.");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setErrorMessage("An error occurred while cancelling the order.");
      setShowError(true);
    } finally {
      setShowModal(false);
      setSelectedOrder(null);
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
                onClick={() => checkIfCanCancel(order)}
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
              <button className="confirm-button" onClick={handleCancelConfirmed}>Yes</button>
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
            <p>{errorMessage}</p>
            <button className="modal-cancel-button" onClick={() => setShowError(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
