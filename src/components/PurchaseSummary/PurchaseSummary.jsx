import React, { useState, useEffect } from 'react';
import './PurchaseSummary.css';
import { SERVER_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa';

const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="custom-date-input" onClick={onClick} ref={ref}>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly
    />
    <FaCalendarAlt className="calendar-icon-clickable" />
  </div>
));
export default function PurchaseSummary() {
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState('');
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
  const [isDeliveryBoxOpen, setIsDeliveryBoxOpen] = useState(false); 
  const username = localStorage.getItem('username');
  const [validWeekdays, setValidWeekdays] = useState([]); 
  const [unavailableWeekdays, setUnavailableWeekdays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/missing-delivery-days`)
      .then(res => res.json())
      .then(data => {
        setUnavailableWeekdays(data.missingDeliveryDays); // <- תוסיפי useState לזה
      })
      .catch(console.error);
  }, []);
  

  function isDateAvailable(dateObj) {
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 2);
  
    const weekdayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  
    return dateObj >= minDate && !unavailableWeekdays.includes(weekdayName);
  }
  
  

// function handleDateChange(e) {
//   const selectedDate = new Date(e.target.value);
//   const weekdayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

//   if (!validWeekdays.includes(weekdayName)) {
//     alert('Cannot select this date – deliveries unavailable');
//     return;
//   }

//   setDate(e.target.value);
// }


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
                    src={item.image ? item.image : '/default-image.jpg'}
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

          {deliveryMethod === 'pickup' && isDeliveryBoxOpen && (
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
          )}

          {deliveryMethod === 'home' && isDeliveryBoxOpen && (
            <>
              <label className="input-label">
                City<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.city}
                onChange={(e) =>
                  setHomeDeliveryInfo({ ...homeDeliveryInfo, city: e.target.value })
                }
              />

              <label className="input-label">
                Street<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.street}
                onChange={(e) =>
                  setHomeDeliveryInfo({ ...homeDeliveryInfo, street: e.target.value })
                }
              />

              <label className="input-label">
                House Number<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.houseNumber}
                onChange={(e) =>
                  setHomeDeliveryInfo({
                    ...homeDeliveryInfo,
                    houseNumber: e.target.value,
                  })
                }
              />

              <label className="input-label">
                Phone Number<span className="required-star">*</span>
              </label>
              <input
                className="input-field"
                type="text"
                value={homeDeliveryInfo.phoneNumber}
                onChange={(e) =>
                  setHomeDeliveryInfo({
                    ...homeDeliveryInfo,
                    phoneNumber: e.target.value,
                  })
                }
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
         <div className="date-field-wrapper">
            <DatePicker
              selected={date ? new Date(date) : null}
              onChange={(dateObj) => {
                const isoDate = dateObj.toISOString().split("T")[0];
                const weekdayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
              
                if (!isDateAvailable(dateObj)) {
                  alert("Date unavailable. Must be at least 2 days from today and on a valid delivery day.");
                  return;
                }
              
                setDate(isoDate);
              
                // slots time from server
                fetch(`${SERVER_URL}/available-slots/${weekdayName}`)
                  .then(res => res.json())
                  .then(data => {
                    console.log("✅ Received slots:", data.availableSlots);
                    setAvailableSlots(data.availableSlots);
                  })
                  .catch(err => console.error('Error loading slots:', err));

              }}
              minDate={new Date(new Date().setDate(new Date().getDate() + 2))}
              filterDate={isDateAvailable}
              highlightDates={[new Date()]}
              placeholderText="dd/mm/yyyy"
              dateFormat="dd/MM/yyyy"
              customInput={<CustomDateInput />}
            />
          </div>
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
              {availableSlots.length > 0 ? (
                availableSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot.charAt(0).toUpperCase() + slot.slice(1)}
                  </option>
                ))
              ) : (
                <option disabled>No slots available</option>
              )}
            </select>

        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="confirm-btn" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>

      <BackToHomeButton />
    </div>
  );
}