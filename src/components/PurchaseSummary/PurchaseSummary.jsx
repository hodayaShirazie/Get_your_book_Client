import React, { useState, useEffect } from 'react';
import './PurchaseSummary.css';
import { SERVER_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

export default function PurchaseSummary() {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('home');
  const [location, setLocation] = useState('Center');
  const [cartItems, setCartItems] = useState([]);
  const [homeDeliveryInfo, setHomeDeliveryInfo] = useState({
    city: '',
    street: '',
    houseNumber: '',
    phoneNumber: ''
  });
  const [deliveryConfirmed, setDeliveryConfirmed] = useState(false);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [error, setError] = useState('');
  const [isDeliveryBoxOpen, setIsDeliveryBoxOpen] = useState(true); // מצב פתוח/סגור לתיבת המשלוח

  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch(`${SERVER_URL}/shopping-cart/${username}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(data);
      })
      .catch(err => console.error('Failed to fetch cart data:', err));
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const handleConfirmDelivery = () => {
    if (deliveryMethod === 'home') {
      const { city, street, houseNumber, phoneNumber } = homeDeliveryInfo;
      if (!city || !street || !houseNumber || !phoneNumber) {
        setError('Please fill all required home delivery fields.');
        return;
      }
    }
    setDeliveryConfirmed(true);
    setError('');
    setIsDeliveryBoxOpen(false); 
  };



  const handleConfirmOrder = async () => {
    if (!deliveryConfirmed) {
      setError('Please confirm delivery information first.');
      return;
    }
  
    if (!date || !timeSlot) {
      setError('Please select delivery date and time slot.');
      return;
    }
  
    setError(''); 
    const finalDeliveryMethod = deliveryMethod === 'home' ? 'home-delivery' : 'pickup-point';

    const fullAddress = finalDeliveryMethod === 'home-delivery'
  ? `${homeDeliveryInfo.street} ${homeDeliveryInfo.houseNumber}, ${homeDeliveryInfo.city}`
  : `Pickup at ${location}`;

  
    const totalPrice = calculateTotal();
    const numberOfProducts = cartItems.reduce((total, item) => total + item.quantity, 0);
    const status = 'approved'; 
  
    console.log(`Delivery Method: ${deliveryMethod}, Full Address: ${fullAddress}, Delivery Date: ${date}, Time Slot: ${timeSlot}, Total Price: ${totalPrice}, Cart Items: ${JSON.stringify(cartItems)}`);
  
    try {
      // 1. Add order
      const orderResponse = await fetch(`${SERVER_URL}/add-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify({
          sum_of_purchase: totalPrice,
          number_of_products: numberOfProducts,
          username: username,
          status,
          delivery_method: finalDeliveryMethod,
          address: fullAddress,
          delivery_date: date,
          time_slot_delivery: timeSlot
        }),
      });
  
      if (!orderResponse.ok) throw new Error('Failed to create order');
  
      const { orderId } = await orderResponse.json();
      console.log('Order ID:', orderId); // Debugging line


      // 2. Add each product separately to order_product
    for (const item of cartItems) {
      const productRes = await fetch(`${SERVER_URL}/add-order-products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          orderId,
          productId: item.id,
          quantity: item.quantity
        }),
      });

      if (!productRes.ok) {
        throw new Error(`Failed to add product ${item.name} to order`);
      }
    }

      // 3. Clear shopping cart
      const clearCartResponse = await fetch(`${SERVER_URL}/shopping-cart/${username}`, {
        method: 'DELETE',
      });

      if (!clearCartResponse.ok) {
        throw new Error('Failed to clear shopping cart');
      }



  
      // Navigate to confirmation 
      console.log('Order ID:', orderId); // Debugging line
      navigate('/order-confirm', { state: { orderId } });
    } catch (err) {
      console.error(err);
      setError('Something went wrong while processing your order.');
    }
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
                onChange={() => {
                  setDeliveryMethod('home');
                  setDeliveryConfirmed(false);
                  setIsDeliveryBoxOpen(true); 
                }}
              />
              Home Delivery
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                checked={deliveryMethod === 'pickup'}
                onChange={() => {
                  setDeliveryMethod('pickup');
                  setDeliveryConfirmed(false);
                  setIsDeliveryBoxOpen(true); 
                }}
              />
              Pickup Point
            </label>
          </div>

          {deliveryMethod === 'pickup' && isDeliveryBoxOpen ? (
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
              <button className="confirm-btn" onClick={handleConfirmDelivery}>
                Confirm Delivery Info
              </button>
            </>
          ) : (
            <>
              <label className="input-label">
                City<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.city}
                onChange={(e) => setHomeDeliveryInfo({ ...homeDeliveryInfo, city: e.target.value })}
              />

              <label className="input-label">
                Street<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.street}
                onChange={(e) => setHomeDeliveryInfo({ ...homeDeliveryInfo, street: e.target.value })}
              />

              <label className="input-label">
                House Number<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.houseNumber}
                onChange={(e) => setHomeDeliveryInfo({ ...homeDeliveryInfo, houseNumber: e.target.value })}
              />

              <label className="input-label">
                Phone Number<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.phoneNumber}
                onChange={(e) => setHomeDeliveryInfo({ ...homeDeliveryInfo, phoneNumber: e.target.value })}
              />

              <button className="confirm-btn" onClick={handleConfirmDelivery}>
                Confirm Delivery Info
              </button>
            </>
          )}
        </div>

        <div className="section">
          <h3>Delivery Date</h3>
          <label className="input-label">
            Date<span className="required-star">*</span>
          </label>
          <input
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label className="input-label">
            Select Time Slot<span className="required-star">*</span>
          </label>
          <select
            className="input-field"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="confirm-btn" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>

      <button className="home-button" onClick={() => navigate('/customer-home')}>
        Return to Home
      </button>
    </div>
  );
}
