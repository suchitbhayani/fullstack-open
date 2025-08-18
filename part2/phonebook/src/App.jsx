import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleQueryChange = event => setQuery(event.target.value)

  const addName = event => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      const existingPerson = persons.find(person => person.name === newName)
      const existingName = existingPerson.name
      const existingID = existingPerson.id

      if (confirm(`${existingName} is already added to the phonebook, replace the old number with a new one?`)) {
        const newObject = {...existingPerson, 'number': newNumber}
        personService.update(existingID, newObject)
        setPersons(persons.map(person => person.id === existingID ? newObject : person))
      }

    } else {
      const newObject = {'name': newName, 'number': newNumber}
      personService.create(newObject)
      setPersons(persons.concat(newObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteName = person => {
    const name = person.name
    const id = person.id
    if (confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id)
      setPersons(persons.filter(person => person.id != id))
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQueryChange}/>

      <h3>add a new</h3>
      <PersonForm 
        onSubmit={addName}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deleteName={deleteName} />
    </div>
  )
}

export default App