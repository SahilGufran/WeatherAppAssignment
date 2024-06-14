// src/components/Favorites.js
import React from 'react';

const Favorites = ({ favorites, fetchWeatherData, removeFavorite }) => {
  return (
    <div className="favorites">
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <span onClick={() => fetchWeatherData(fav.city)}>{fav.city}</span>
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
