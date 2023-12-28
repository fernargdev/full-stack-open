import { useEffect, useState } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleInputChange = (setter) => (event) => setter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatePerson = { ...existingPerson, number: newNumber }

        personService
          .update(updatePerson.id, updatePerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            )
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch((error) => {
          console.log(error)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .eliminate(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <header>
        <h2>Phonebook</h2>
        <Filter
          filter={filter}
          handleFilterChange={handleInputChange(setFilter)}
        />
      </header>

      <main>
        <h2>Add a New</h2>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleInputChange(setNewName)}
          newNumber={newNumber}
          handleNumberChange={handleInputChange(setNewNumber)}
        />
      </main>

      <footer>
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          filter={filter}
          deletePerson={deletePerson}
        />
      </footer>
    </>
  )
}

export default App
