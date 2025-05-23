// import React from 'react';
import { useNavigate } from 'react-router-dom';  
import './ManagerHomePage.css';
import React, { useEffect, useState } from 'react';

import { SERVER_URL } from '../../config'; 


const ManagerHomePage = () => {
  const navigate = useNavigate();  

  const navigateToAbout = () => {
    navigate('/about');  
  };

  const navigateToCatalog = () => {
    navigate('/admin-catalog');
  };

  const navigateToUpdateProfile = () => {
    navigate('/update-profile');  
  };
  const navigateToViewOrders = () => {
    navigate('/view-orders');  
  };


  const navigateToSetDeliveryDays = () => {
    navigate('/set-delivery-days');
  };
  const navigateToLowStockAlerts = () => {
    navigate('/low-stock-alerts');
  };

  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    fetch(`${SERVER_URL}/low-stock-alerts`)
      .then(res => res.json())
      .then(data => {
        setLowStockCount(data.length);
      })
      .catch(err => {
        console.error("Failed to fetch low stock alerts:", err);
      });
  }, []);

  

  return (
    <div className="manager-homepage">
      <div className="top-right-buttons">
        <button
          className="about-button"
          onClick={navigateToAbout}  
        >
          About
        </button>
      </div>

      <div className="container">
        <button
          className="notification notification-inside"
          title="Notifications"
          onClick={navigateToLowStockAlerts}
          >
          <svg
            className="bell-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#225536"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {lowStockCount > 0 && (
            <span className="notification-badge">{lowStockCount}</span>
          )}
        </button>

        <h2>Manager Homepage</h2>
        <div className="menu">
          <button onClick={navigateToUpdateProfile}>Edit Personal Information</button>
          <button onClick={navigateToCatalog}>Catalog</button>
          <button onClick={() => navigate('/view-orders')}>View Orders</button>
          <button onClick={() => navigate('/store-statistics')}>Store Statistics</button>
          <button onClick={navigateToSetDeliveryDays}>Set Delivery Days</button>
        </div>
      </div>
    </div>
  );
};

export default ManagerHomePage;
