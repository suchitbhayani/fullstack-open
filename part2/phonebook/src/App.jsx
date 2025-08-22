import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleQueryChange = event => setQuery(event.target.value)

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName);

    // person already exists
    if (existingPerson) {
      if (confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p));
            setSuccessMessage(`Updated ${newName}`);
            setTimeout(() => setSuccessMessage(null), 5000);
          })
          .catch(() => {
            setErrorMessage(`Information of ${newName} has already been removed from server`);
            setTimeout(() => setErrorMessage(null), 5000);
            return;
          });
      }

    // add new person
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => setSuccessMessage(null), 5000);
      });
    }

    // cleanup
    setNewName('');
    setNewNumber('');
  };



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
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
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