import React, { useEffect, useState } from "react";
import "./StoreStatistics.css";
import { SERVER_URL } from '../../config';


const StoreStatistics = () => {
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState("lastMonth");

  useEffect(() => {
    fetch(`${SERVER_URL}/statistics?range=${timeRange}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching statistics:", err));
  }, [timeRange]);

  return (
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
            All time
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
          <h2>📊 Statistics Summary (Selected Date)</h2>
          <hr />
          {stats ? (
            <>
              <p><strong>Number of Registered Users:</strong> {stats.users}</p>
              <p><strong>Number of Products:</strong> {stats.products}</p>
              <p><strong>Number of Sells:</strong> {stats.sells}</p>
              <p><strong>Revenue:</strong> {stats.revenue}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <button className="home-button">Return to Home</button>
      </div>
    </div>
  );
};

export default StoreStatistics;
