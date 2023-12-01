"use client"
import React, { useState, useEffect } from 'react';
import { Search } from '@mui/icons-material';
import WbSunny from '@mui/icons-material/WbSunny';

const Page = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("London");
  const [newCity, setNewCity] = useState(""); // Corrected typo in variable name
  const apiKey = 'a46aa7a224eb454792684906231410';

  // Declare fetchData in the outer scope
  const fetchData = async (city) => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData(city); // Call fetchData in useEffect with newCity
  }, [city, apiKey]);

  const handleSearch = () => {
    fetchData(newCity); // Call fetchData with the new city
  };

  return (
    <div>
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        weatherData && (
          <div className='main'>
            <div className='data'>
            <h2 className="extra">Weather App</h2>

              <div className="InputFields">
                <input
                  className="professional-input"
                  type='text'
                  placeholder="Search"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
                <Search className='search-icon' onClick={handleSearch} />
              </div>
              <WbSunny className="sunny" fontSize="large" />
              <h3>{weatherData.current.temp_c}°C</h3>
              <h3>{newCity}</h3>
          
              <h2>Weather Details</h2>
              
              <div className="lastOptions">
              
                <p>Cloud: {weatherData.current.cloud}%</p>
                <p>Condition: {weatherData.current.condition.text}</p>
                <p>Feels Like (Celsius): {weatherData.current.feelslike_c}°C</p>
                <p>Feels Like (Fahrenheit): {weatherData.current.feelslike_f}°F</p>
                <p>Wind Speed (km/h): {weatherData.current.wind_kph} km/h</p> 
                <p>Wind Direction: {weatherData.current.wind_dir}</p>
                <p>Humidity: {weatherData.current.humidity}%</p>
                <p>UV: {weatherData.current.uv}</p>
                <p>Visibility (km): {weatherData.current.vis_km} km</p>
                <p>Visibility (miles): {weatherData.current.vis_miles} miles</p>
                {/* Add more weather data fields as needed */}
              </div>
              <p>All Rights Reservered : App By Shahzaib Ibrar</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
/* //Shahzaib Ibrar all rights reserved */

export default Page;
