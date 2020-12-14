import React from 'react'
import Country from './Country'

const DisplayCountries = ({countries, handleShowCountry}) => {

  return (
    <div>
      {countries.length === 1 ?
      // detailed search for countries
      <Country country={countries[0]} /> :
      countries.length <= 10 ?
      countries.map (country => 
        <div key={country.numericCode} >
          {country.name}
          <button value={country.name} onClick={handleShowCountry}>show</button>
        </div>
      ) : 
      'Too many matches, specify another filter'
      }
    </div>
  )
}



export default DisplayCountries