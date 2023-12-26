import { useEffect, useState } from 'react'

import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('Effect')

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
        console.log('Promesa exitosa')
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : []

  return (
    <>
      <main>
        <label>
          Find countries:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>

        {countriesToShow.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countriesToShow.length === 1 ? (
          <section>
            <h2>{countriesToShow[0].name.common}</h2>

            <h3>Basic data: </h3>
            <p>
              Capital: {countriesToShow[0].capital} <br />
              Population: {countriesToShow[0].population} <br />
              Area: {countriesToShow[0].area} <br />
            </p>

            <h3>Languages:</h3>
            <ul>
              {Object.values(countriesToShow[0].languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>

            <h3>Flag:</h3>
            <img
              width={100}
              src={countriesToShow[0].flags.png}
              alt={countriesToShow[0].name.common}
            />
          </section>
        ) : (
          <ul>
            {countriesToShow.map((country) => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
        )}
      </main>

      <section>
        <p>
          Filter: {filter} <br />
          Count: {countriesToShow.length} <br />
        </p>
      </section>
    </>
  )
}

export default App
