import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './ManagerHomePage.css';

import { SERVER_URL } from '../../config'; 


const ManagerHomePage = () => {
  const navigate = useNavigate();  // Create navigate function

  const navigateToAbout = () => {
    navigate('/about');  // Navigate to the About page
  };

  const navigateToCatalog = () => {
    navigate('/admin-catalog');  // Navigate to the About page
  };

  const navigateToUpdateProfile = () => {
    navigate('/update-profile');  
  };

  return (
    <div className="manager-homepage">
      <div className="top-right-buttons">
        <button
          className="about-button"
          onClick={navigateToAbout}  // Use navigateToAbout to go to /about
        >
          About
        </button>
      </div>

      <div className="container">
        <button
          className="notification notification-inside"
          title="Notifications"
          onClick={() => alert("Notification clicked!")}
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
        </button>

        <h2>Manager Homepage</h2>
        <div className="menu">
          <button onClick={navigateToUpdateProfile}>Edit Personal Information</button>
          <button onClick={navigateToCatalog}>Catalog</button>

          <button>Edit Price</button>
          <button onClick={() => navigate('/view-orders')}>View Orders</button>
          <button>Update Product Quantity</button>
          <button>Set Delivery Days</button>
          <button onClick={() => navigate('/store-statistics')}>Store Statistics</button>
        </div>
      </div>
    </div>
  );
};

export default ManagerHomePage;
