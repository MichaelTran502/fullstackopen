import React from 'react'
import Weather from './Weather'

// displays a single country
const Country = ({country}) => {

  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}
      <br />
      population {country.population}
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img alt={"Country flag"} width={"200px"}src={country.flag}></img>
      <Weather capital={country.capital} />
    </div>
  )
}


export default Country 