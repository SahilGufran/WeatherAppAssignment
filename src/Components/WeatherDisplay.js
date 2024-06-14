import React from 'react';

const WeatherDisplay = ({ weatherData, forecastData, unit, addFavorite }) => {
  const {
    name,
    main: { temp, humidity },
    weather: [details],
  } = weatherData;

  // Function to get one forecast per day 
  const getDailyForecasts = (forecastData) => {
    const dailyForecasts = [];
    const forecastList = forecastData.list;
    const hours = 12; // Target hour (12:00 PM)

    for (let i = 0; i < forecastList.length; i++) {
      const forecast = forecastList[i];
      const date = new Date(forecast.dt_txt);
      if (date.getHours() === hours) {
        dailyForecasts.push(forecast);
      }
    }

    // If no forecast found at the target hour for a day, take the closest available forecast
    if (dailyForecasts.length < 5) {
      const datesAdded = new Set(dailyForecasts.map(forecast => new Date(forecast.dt_txt).getDate()));
      for (let i = 0; i < forecastList.length && dailyForecasts.length < 5; i++) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt_txt).getDate();
        if (!datesAdded.has(date)) {
          dailyForecasts.push(forecast);
          datesAdded.add(date);
        }
      }
    }

    return dailyForecasts.slice(0, 5);
  };

  const dailyForecasts = getDailyForecasts(forecastData);

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <p>Temperature: {temp}° {unit === 'metric' ? 'F' : 'C'}</p>
      <p>Humidity: {humidity}%</p>
      <p>Conditions: {details.description}</p>
      <button onClick={() => addFavorite(name)}>Add to Favorites</button>
      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {dailyForecasts.map((forecast) => (
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
