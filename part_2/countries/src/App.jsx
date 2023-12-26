import { useEffect, useState } from 'react'

import axios from 'axios'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountryList'
// import CountryList from './components/CountryList'

// const CountryList = ({ countriesToShow, handleShowClick }) => {
//   return (
//     <ul>
//       {countriesToShow.map((country) => (
//         <li key={country.name.common}>
//           {country.name.common}
//           <button onClick={() => handleShowClick(country)}>show</button>
//         </li>
//       ))}
//     </ul>
//   )
// }

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    console.log('Effect')

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
        console.log('Promesa exitosa')
      })
      .catch((error) => {
        console.log('Promesa fallida')
        console.log(error)
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleShowClick = (country) => setSelectedCountry(country)

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
          <CountryDetails country={countriesToShow[0]} />
        ) : (
          <CountryList
            countriesToShow={countriesToShow}
            handleShowClick={handleShowClick}
          />
        )}
        {selectedCountry && <CountryDetails country={selectedCountry} />}
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

// TODO: Tiene algun bug de logica la funcionalidad de mostrar country selected
