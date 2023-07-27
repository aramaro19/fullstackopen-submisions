import React from "react";

const Country = ({country}) => {
    return <div>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital}<br></br>
          population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(country.languages).map(value => <li key={value}>{value}</li>)}
          </ul>
          {country.flag}
        </div>
  }

export default Country