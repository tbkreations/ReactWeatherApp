import React, { useState } from 'react';
import './App.css';
const api = {
  key: "2362d583e220c3c740ae4e67c9abadbd",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        });
    } 
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <header className="App-header">
        TBK Weather App
        <input className="search-bar" type="text" placeholder="Enter a Location" onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}></input>
      </header>
      {(typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}ºF
          <div className="feels-like">
          Feels Like: {Math.round(weather.main.feels_like)}ºF
            </div>
        </div>
        <div className="weather">{weather.weather[0].main}</div>
        <div className="subweather">{weather.weather[0].description}</div>
      </div>
      </div>
      ) : ('')}
    </div>
  );
}

export default App;
