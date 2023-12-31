import React, { useState, useEffect } from "react";
import axios from "axios";

export const Weather = () => {
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "cd9e264ce1b84533a9750115233112"; // Replace with your actual API key from weatherapi.com
  const apiUrl = "https://api.weatherapi.com/v1/current.json"; // Replace with the actual API endpoint

  const fetchData = async () => {
    setLoading(true);
    const fullUrl = `${apiUrl}?key=${apiKey}&q=${country}`;

    try {
      const response = await axios.get(fullUrl);
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (country) {
      fetchData();
    }
  }, [country]);

  return (
    <div>
      <h1>Weather Information</h1>
      <div className="col-sm-4 mx-auto">
        <label className="form-label">Enter Country:</label>
        <input
          className="form-control"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      {loading && <p className="text-warning">Loading...</p>}

      {error && <p className="text-danger">Error: {error}</p>}

      {weatherData && (
        <div>
          <p className="mb-1">City: {weatherData.location.name}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
        </div>
      )}
    </div>
  );
};

/* import React, { useState } from "react";
import axios from "axios";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "cd9e264ce1b84533a9750115233112"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://www.weatherapi.com/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError(null);
      console.log(response);
    } catch (error) {
      setWeatherData(null);
      setError("City not found");
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} &deg;C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
 */
