// src/components/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weatherData, forecastData, unit, addFavorite }) => {
  const {
    name,
    main: { temp, humidity },
    weather: [details],
  } = weatherData;

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <p>Temperature: {temp}° {unit === 'metric' ? 'F' : 'C'}</p>
      <p>Humidity: {humidity}%</p>
      <p>Conditions: {details.description}</p>
      <button onClick={() => addFavorite(name)}>Add to Favorites</button>
      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {forecastData.list.slice(0, 5).map((forecast) => (
          <div key={forecast.dt}>
            <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {forecast.main.temp}° {unit === 'metric' ? 'F' : 'C'}</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
