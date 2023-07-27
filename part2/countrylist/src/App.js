import React, {useState, useEffect} from "react";
import axios from "axios";
import Filter from "./components/FIlter";
import Countries from "./components/Countries"; 

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

export default App;
