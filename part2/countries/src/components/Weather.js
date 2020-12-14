import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({request: {}, location: {}, current: {}})
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [url])


  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>temperature: {weather.current.temperature}</p>
      <img alt={"weather icon"} width={"200px"} src={weather.current.weather_icons}></img>
      <p>wind: {weather.current.wind_speed}mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default Weather