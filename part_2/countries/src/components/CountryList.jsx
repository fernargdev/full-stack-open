const CountryList = ({ countriesToShow, handleShowClick }) => {
  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShowClick(country)}>show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
