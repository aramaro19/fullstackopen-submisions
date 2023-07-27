import React from "react";
import Country from "./Country";

const Countries = ({countries, filter, handleButton}) => {
    if (filter.length === 0) return <div>please search a country</div>
    else {
      const filteredCountries = countries.filter(country => country.name.official.toLowerCase().includes(filter.toLowerCase()))
      if (filteredCountries.length > 10) {
        return <div>Too many matches, please specify another filter</div>
      }
      else if (filteredCountries.length === 0) {
        return <div>Found no matches</div>
      }
      else if (filteredCountries.length > 2) {
        return filteredCountries.map(country => <div key={country.flag}>{country.name.official}
        <button value={country.name.official} onClick={handleButton}>show</button></div>)
      }
      else {
        return <Country country={filteredCountries[0]}/>
      }
    }
  }

export default Countries