import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ name }) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  if (!country) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </>
  )
}

export default Country