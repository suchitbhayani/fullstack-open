import Country from './Country'

const Display = ({ matches, setMatches }) => {
  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (matches.length > 1 && matches.length <= 10) {
    return (
      <ul>
        {matches.map(country => (
          <li key={country}>
            {country}{" "}
            <button onClick={() => setMatches([country])}>Show</button>
          </li>
        ))}
      </ul>
    )
}

  if (matches.length === 1) {
    return <div><Country name={matches[0]} /></div>
  }

  return <p>No matches found</p>
}

export default Display