import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LowStockAlerts.css';
import { SERVER_URL } from '../../config';
import BackToHomeButton from "../BackToHomeButton/BackToHomeButton";


export default function LowStockAlerts() {
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${SERVER_URL}/low-stock-alerts`)
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => {
        console.error('Failed to fetch low stock alerts:', err);
        setAlerts([]);
      });
  }, []);

  return (
    <div className="low-stock-page">
      <div className="alerts-container">
        <h2>Low Stock Alerts</h2>
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Current Stock</th>
              <th>Threshold</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-alerts">No low stock alerts.</td>
              </tr>
            ) : (
              alerts.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.stock_quantity}</td>
                  <td>{item.min_stock_threshold}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
         <BackToHomeButton /> 
      </div>
    </div>
  );
}
