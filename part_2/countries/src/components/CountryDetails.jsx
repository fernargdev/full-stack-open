const CountryDetails = ({ country }) => {
  return (
    <section>
      <h2>{country.name.common}</h2>

      <h3>Basic data: </h3>
      <p>
        Capital: {country.capital} <br />
        Population: {country.population} <br />
        Area: {country.area} <br />
      </p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <h3>Flag:</h3>
      <img width={100} src={country.flags.png} alt={country.name.common} />
    </section>
  )
}

export default CountryDetails
