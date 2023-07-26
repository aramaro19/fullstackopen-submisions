import React, {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    console.log(event.target.value) 
    setFilter(event.target.value)
  }

  const handleButton = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const hook = () => {
    console.log("efect")
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
        console.log(response) })
      
  }

  useEffect(hook, [])



  return <div>
    <Filter filter={filter} handleFilter={handleFilter}/>
    <Countries countries={countries} filter={filter} handleButton={handleButton}/>
  </div>
}

const Filter = (props) => {
  return <div>find countries <input 
  value={props.filter}
  onChange={props.handleFilter}>
    </input></div>
}

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
      const selected = filteredCountries[0] 
      console.log(selected.languages)
      console.log(Object.values(selected.languages)) 
      return <div>
        <h2>{selected.name.common}</h2>
        <p>capital {selected.capital}<br></br>
        population {selected.population}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(selected.languages).map(value => <li key={value}>{value}</li>)}
        </ul>
        {selected.flag}
      </div>
    }
  }  
}


export default App;
