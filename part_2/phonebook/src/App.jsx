import { useEffect, useState } from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

// 2.15: Guía telefónica paso7
// Regresemos a nuestra aplicación de agenda telefónica.
// Actualmente, los números que se agregan a la agenda no
// se guardan en un servidor backend. Arregla esta situación.

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        console.log(response)
      })
  }

  return (
    <>
      <header>
        <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </header>

      <main>
        <h2>Add a New</h2>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </main>

      <footer>
        <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} />
      </footer>
    </>
  )
}

export default App
