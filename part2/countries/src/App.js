import React, { useState, useEffect } from 'react'
import DisplayCountries from './components/DisplayCountries'
import SearchFilter from './components/SearchFilter'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setNewFilter] = useState('');

  // use an effect hook to setCountries
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase()))

  const handleShowCountry = (event) =>
    setNewFilter(event.target.value)

  return (
    <div> 
      <SearchFilter search={filter} handleSearch={handleNewFilter}/>
      <DisplayCountries countries={filteredCountries} handleShowCountry={handleShowCountry}/>
    </div>
  )
}



export default App;
