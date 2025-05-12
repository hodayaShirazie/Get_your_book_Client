import React, { useState, useEffect } from "react";
import "./SetDeliveryDays.css";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../BackToHomeButton/BackToHomeButton";
import { SERVER_URL } from '../../config'; 


const daysOfWeek = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const defaultTimeSlots = ["Morning", "Afternoon", "Evening"];

const SetDeliveryDays = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [deliveryDays, setDeliveryDays] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        selected: false,
        timeSlots: {
          Morning: false,
          Afternoon: false,
          Evening: false,
        },
      };
      return acc;
    }, {})
  );


  useEffect(() => {
    fetch("http://localhost:3000/api/delivery-days")
      .then(response => response.json())
      .then(data => {
        const updatedDays = daysOfWeek.reduce((acc, day) => {
          const savedDay = data.deliveryDays.find(d => d.day === day);
          if (savedDay) {
            acc[day] = {
              selected: true,
              timeSlots: {
                Morning: savedDay.timeSlots.includes("Morning"),
                Afternoon: savedDay.timeSlots.includes("Afternoon"),
                Evening: savedDay.timeSlots.includes("Evening"),
              },
            };
          } else {
            acc[day] = {
              selected: false,
              timeSlots: {
                Morning: false,
                Afternoon: false,
                Evening: false,
              },
            };
          }
          return acc;
        }, {});
        setDeliveryDays(updatedDays);
      })
      .catch(err => {
        console.error("Failed to fetch delivery days", err);
      });
  }, []);
  

  const handleDayChange = (day) => {
    const isSelected = !deliveryDays[day].selected;
    setDeliveryDays((prev) => ({
      ...prev,
      [day]: {
        selected: isSelected,
        timeSlots: defaultTimeSlots.reduce((acc, slot) => {
          acc[slot] = isSelected;
          return acc;
        }, {}),
      },
    }));
  };

  const handleTimeSlotChange = (day, slot) => {
    setDeliveryDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: {
          ...prev[day].timeSlots,
          [slot]: !prev[day].timeSlots[slot],
        },
      },
    }));
  };

  const handleSave = async () => {
    const dataToSend = Object.entries(deliveryDays)
      .filter(([_, value]) => value.selected)
      .map(([day, value]) => ({
        day,
        timeSlots: Object.entries(value.timeSlots)
          .filter(([_, checked]) => checked)
          .map(([slot]) => slot),
      }));

    try {
      await fetch(`${SERVER_URL}/api/delivery-days`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryDays: dataToSend }),
      });
      setModalMessage("Delivery days saved successfully!");
      setShowModal(true);
    } catch (err) {
      console.error("Failed to save delivery days", err);
      setModalMessage("Failed to save delivery days.");
      setShowModal(true);
    }
  };

  return (
    <div className="set-delivery-days-page">
      <BackToHomeButton /> 
      <div className="set-delivery-days-container">
        <h2>Set Delivery Day</h2>
        <p style={{ textAlign: "center", color: "#2e4a32", marginBottom: "20px" }}>
          Select available delivery days and available time slots
        </p>

        {daysOfWeek.map((day) => (
          <div key={day} className="day-section">
            <div className="day-header">
              <input
                type="checkbox"
                checked={deliveryDays[day].selected}
                onChange={() => handleDayChange(day)}
              />
              <label>{day}</label>
            </div>
            {deliveryDays[day].selected && (
              <div className="time-slots">
                {defaultTimeSlots.map((slot) => (
                  <label key={slot}>
                    <input
                      type="checkbox"
                      checked={deliveryDays[day].timeSlots[slot]}
                      onChange={() => handleTimeSlotChange(day, slot)}
                    />
                    {slot}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="buttons">
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{modalMessage}</p>
            <button className="modal-cancel-button" onClick={() => {
              setShowModal(false);
              if (modalMessage.includes("successfully")) {
                navigate("/admin-home");
              }
            }}>
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SetDeliveryDays;
