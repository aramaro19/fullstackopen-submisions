import React from "react";

const Weather = ({weather, name}) => {
    const src = `https:${weather.condition.icon}`
    return <div>
      <h2>Weather in {name}</h2>
      <strong>temperature: </strong> {weather.temp_c} Celsius <br></br>
      <img alt="weather icon" src={src}></img><br></br>
      <strong>wind: </strong> {weather.wind_mph} mph direction {weather.wind_dir}
    </div>
  }

export default Weather