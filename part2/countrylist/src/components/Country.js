import axios from "axios";
import React, { useEffect, useState } from "react";
import Weather from "./Weather";

const Country = ({country}) => {
  const [weather, setWeather] = useState({
    "temp_c": 0,
    "condition": {
        "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
    },
    "wind_mph": 0,
    "wind_dir": "N",
})

  //https://api.weatherapi.com/v1/current.json?key=5ac0605074834549be8110557232707&q=China&aqi=no


  const hook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)
    const query = country.name.common
    console.log('query', query)
    const http = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${query}&aqi=no`
    console.log(http)
    axios 
      .get(http)
      .then(response => {
        setWeather(response.data.current)
        console.log('current', response.data) 
        console.log(http)
      })
  }

  useEffect(hook, [country.name.common])

  console.log('weather new', weather) 

    return <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}<br></br>
          population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(country.languages).map(value => <li key={value}>{value}</li>)}
          </ul>
          {country.flag}
          <Weather weather={weather} name={country.name.common}/>
        </div>
  }

  

export default Country