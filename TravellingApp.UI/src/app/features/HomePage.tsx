import React, { useState } from "react";
import './styles/HomePage.css';
const Home = () => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
 
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    fetch('http://localhost:3050/restaurantsData', {
      method: 'POST',
      body: JSON.stringify({ city }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    fetch('http://localhost:3060/rentCarData', {
      method: 'POST',
      body: JSON.stringify({ city, startDate, endDate }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    fetch('http://localhost:8008/monuments', {
      method: 'POST',
      body: JSON.stringify({ city }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    fetch('http://localhost:8000/hotels', {
      method: 'POST',
      body: JSON.stringify({ city, startDate, endDate }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

  };

  return (
    <div>
      <h1>Welcome to Home page</h1>
      <form className="formStyle" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={handleCityChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
