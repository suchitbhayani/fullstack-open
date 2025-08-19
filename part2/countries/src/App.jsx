import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Display from './components/Display'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])

  const handleChange = (event) => {
    const newQuery = event.target.value.toLowerCase()
    setMatches(countries.filter(country => country.toLowerCase().includes(newQuery)))
    setQuery(newQuery)
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
  }, [])

  return (
    <>
      <Filter query={query} handleChange={handleChange} />
      <Display matches={matches} setMatches={setMatches} />
    </>
  )
}

export default App
