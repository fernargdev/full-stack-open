import { useEffect, useState } from 'react'

import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${API_KEY}`
      )
      .then((response) => {
        // console.log(response.data[0])
        const { lat, lon } = response.data[0]

        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
      })
      .then((response) => {
        // console.log(response.data)
        setWeather(response.data)
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }, [country])

  const temperature = `${(weather?.main.temp - 273.15).toFixed(2)} °C`
  const wind = `${weather?.wind.speed.toFixed(2)} m/s`
  const humidity = `${weather?.main.humidity}`
  const weatherIcon = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`
  const weatherDescription = `${weather?.weather[0].description}`

  return (
    <section>
      <h2>{country.name.common}</h2>

      <article>
        <h3>Basic data:</h3>
        <p>
          Capital: {country.capital} <br />
          Population: {country.population} <br />
          Area: {country.area} <br />
        </p>
      </article>

      <article>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </article>

      <article>
        <h3>Flag:</h3>
        <img width={100} src={country.flags.png} alt={country.name.common} />
      </article>

      {weather && (
        <article>
          <h3>Weather in {country.capital}:</h3>
          <p>
            Temperature: {temperature} <br />
            Wind: {wind} <br />
            Humidity: {humidity} <br />
            Weather: {weatherDescription} <br />
            <img
              style={{
                backgroundColor: '#9e9e9e',
                width: '120px',
                height: '80px',
              }}
              src={weatherIcon}
              alt={`${country.capital} weather`}
            />
          </p>
        </article>
      )}
    </section>
  )
}

export default CountryDetails
