
// import React, { useEffect, useState } from 'react';
// import './OrderConfirm.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { SERVER_URL } from '../../config';

// export default function OrderConfirmation({ userId }) {
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const location = useLocation();
//   const orderId = location.state?.orderId;

//   useEffect(() => {
//     async function fetchOrder() {
//       try {
//         const res = await fetch(`${SERVER_URL}/order-products/${orderId}`);
//         if (!res.ok) throw new Error('Failed to fetch order');
//         const data = await res.json();
//         setOrder(data);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     fetchOrder();
//   }, [orderId]);

//   if (!order) return <p>Loading order...</p>;

//   return (
//     <div className="confirmation-page">
//       <div className="confirmation-container">
//         <h2>Your order has been placed successfully!</h2>

//         <div className="order-section">
//           <p><strong>Order Number:</strong> #{order.id}</p>

//           <p><strong>Items Ordered:</strong></p>
//           {order.products && order.products.length > 0 ? (
//             order.products.map((product, index) => (
//               <p key={index}>
//                 {product.name} — Quantity: {product.quantity} — Price: ${product.price}
//               </p>
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}

//           <p className="total"><strong>Total:</strong> ${order.sum_of_purchase}</p>

//           <p><strong>Delivery Method:</strong> {order.delivery_method === 'home-delivery' ? 'Home Delivery' : 'Pickup Point'}</p>

//           {order.delivery_method === 'home-delivery' && (
//             <>
//               <p><strong>Address:</strong> {order.address}</p>
//             </>
//           )}
//           <p><strong>Delivery Date:</strong> {new Date(order.delivery_date).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
//           <p><strong>Time Slot:</strong> {order.time_slot_delivery}</p>
//         </div>
//       </div>

//       <button className="home-button" onClick={() => navigate('/customer-home')}>Return to Home</button>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import './OrderConfirm.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { SERVER_URL } from '../../config';

// export default function OrderConfirmation({ userId }) {
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const location = useLocation();
//   const orderId = location.state?.orderId;

//   useEffect(() => {
//     async function fetchOrder() {
//       try {
//         const res = await fetch(`${SERVER_URL}/order-products/${orderId}`);
//         if (!res.ok) throw new Error('Failed to fetch order');
//         const data = await res.json();
//         setOrder(data);
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     fetchOrder();
//   }, [orderId]);

//   if (!order) return <p>Loading order...</p>;

//   return (
//     <div className="confirmation-page">
//       <div className="confirmation-container">
//         <h2>Your order has been placed successfully!</h2>

//         <div className="order-section">
//           <p><strong>Order Number:</strong> #{order.id}</p>

//           <p><strong>Items Ordered:</strong></p>
//           <div className="products-list">
//   {order.products && order.products.length > 0 ? (
//     order.products.map((product, index) => (
//       <div className="product-row" key={index}>
//         <span className="product-cell name">{product.name}</span>
//         <span className="product-cell price">${product.price}</span>
//         <span className="product-cell category">{product.category}</span>
//       </div>
//     ))
//   ) : (
//     <p>No products found.</p>
//   )}
// </div>


//           <p className="total"><strong>Total:</strong> ${order.sum_of_purchase}</p>

//           <p><strong>Delivery Method:</strong> {order.delivery_method === 'home-delivery' ? 'Home Delivery' : 'Pickup Point'}</p>

//           {order.delivery_method === 'home-delivery' && (
//             <p><strong>Address:</strong> {order.address}</p>
//           )}

//           <p><strong>Delivery Date:</strong> {new Date(order.delivery_date).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
//           <p><strong>Time Slot:</strong> {order.time_slot_delivery}</p>
//         </div>
//       </div>

//       <button className="home-button" onClick={() => navigate('/customer-home')}>
//         Return to Home
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import './OrderConfirm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

export default function OrderConfirmation({ userId }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const orderId = location.state?.orderId;

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`${SERVER_URL}/order-products/${orderId}`);
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <h2>Your order has been placed successfully!</h2>

        <div className="order-section">
          <p><strong>Order Number:</strong> #{order.id}</p>

          <p><strong>Items Ordered:</strong></p>
          {order.products && order.products.length > 0 ? (
            <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>          
          ) : (
            <p>No products found.</p>
          )}

          <p className="total"><strong>Total:</strong> ${order.sum_of_purchase}</p>

          <p><strong>Delivery Method:</strong> {order.delivery_method === 'home-delivery' ? 'Home Delivery' : 'Pickup Point'}</p>

          {order.delivery_method === 'home-delivery' && (
            <p><strong>Address:</strong> {order.address}</p>
          )}

          <p><strong>Delivery Date:</strong> {new Date(order.delivery_date).toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
          <p><strong>Time Slot:</strong> {order.time_slot_delivery}</p>
        </div>
      </div>

      <BackToHomeButton />

    </div>
  );
}
