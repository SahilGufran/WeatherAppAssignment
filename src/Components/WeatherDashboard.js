import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [lastSearchedCity, setLastSearchedCity] = useState(
    localStorage.getItem('lastSearchedCity') || ''
  );

  useEffect(() => {
    if (lastSearchedCity) {
      fetchWeatherData(lastSearchedCity);
    }
  }, [lastSearchedCity]);

  const fetchWeatherData = async (city) => {
    const apiKey = '52186ce78c80db355b9106da73ccd652'; //  OpenWeatherMap API key
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
    );
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
    );
    setWeatherData(weatherResponse.data);
    setForecastData(forecastResponse.data);
    setLastSearchedCity(city);
    localStorage.setItem('lastSearchedCity', city);
  };

  const fetchFavorites = async () => {
    const response = await axios.get('http://localhost:5000/favorites');
    setFavorites(response.data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = async (city) => {
    await axios.post('http://localhost:5000/favorites', { city });
    fetchFavorites();
  };

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:5000/favorites/${id}`);
    fetchFavorites();
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    if (lastSearchedCity) {
      fetchWeatherData(lastSearchedCity);
    }
  };

  return (
    <div className="weather-dashboard">
      <button onClick={toggleUnit}>
        Toggle to {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
      </button>
      <Search fetchWeatherData={fetchWeatherData} />
      {weatherData && (
        <WeatherDisplay
          weatherData={weatherData}
          forecastData={forecastData}
          unit={unit}
          addFavorite={addFavorite}
        />
      )}
      <Favorites
        favorites={favorites}
        fetchWeatherData={fetchWeatherData}
        removeFavorite={removeFavorite}
      />
    </div>
  );
};

export default WeatherDashboard;
