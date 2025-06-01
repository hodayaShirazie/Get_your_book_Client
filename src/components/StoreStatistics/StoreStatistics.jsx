import React, { useEffect, useState } from "react";
import "./StoreStatistics.css";
import { SERVER_URL } from '../../config';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';
import { useNavigate } from 'react-router-dom';

const StoreStatistics = () => {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState("lastMonth");
  const navigate = useNavigate();

  useEffect(() => {
    if (timeRange === "lastMonth") {
      fetchStats("last-month");
    } else if (timeRange === "last3Months") {
      fetchStats("last-3-months");
    }
  }, [timeRange]);

  const fetchStats = async (range) => {
    try {
      const response = await fetch(`${SERVER_URL}/statistics/${range}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="statistics-bg">
      <div className="statistics-container">
        <div className="statistics-card">
          <h1 className="title">Store Statistics</h1>

          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="timeRange"
                value="lastMonth"
                checked={timeRange === "lastMonth"}
                onChange={() => setTimeRange("lastMonth")}
              />
              Last month
            </label>
            <label>
              <input
                type="radio"
                name="timeRange"
                value="last3Months"
                checked={timeRange === "last3Months"}
                onChange={() => setTimeRange("last3Months")}
              />
              Last 3 months
            </label>
          </div>

          <div className="summary-box">
            <h2>📊 Statistics Summary ({timeRange === "lastMonth" ? "Last Month" : "Last 3 Months"})</h2>
            <hr />
            {stats ? (
              <>
                <p><strong>Total Purchases:</strong> {stats.totalPurchases}</p>
                <p><strong>Total Revenue:</strong> {stats.totalRevenue.toFixed(2)}$</p>
                {stats.bestSellingBook ? (
                  <p>
                    <strong>Best Selling Book:</strong> #{stats.bestSellingBook.id}  *{stats.bestSellingBook.name}* {stats.bestSellingBook.quantitySold} sold
                  </p>
                ) : (
                  <p>No sales data available</p>
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <BackToHomeButton />
        </div>
      </div>
    </div>
  );
};

export default StoreStatistics;
