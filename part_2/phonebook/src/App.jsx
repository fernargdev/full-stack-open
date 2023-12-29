import { useEffect, useState } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    message: null,
    isError: false,
  })

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch((error) => {
        console.log(error)
        setMessage({
          message: `People could not be obtained`,
          isError: true,
        })

        setTimeout(() => {
          setMessage({ message: null, isError: false })
        }, 5000)
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
            setMessage({
              message: `Update ${returnedPerson.name}`,
            })
          })
          .catch((error) => {
            console.log(error)
            setMessage({
              message: `Information of ${newName} has already been removed from server`,
              isError: true,
            })
            setPersons(persons.filter((p) => p.id !== existingPerson.id))
          })
          .finally(() => {
            setTimeout(() => {
              setMessage({ message: null, isError: false })
            }, 5000)
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
          setMessage({
            message: `Added ${returnedPerson.name}`,
          })
        })
        .catch((error) => {
          console.log(error)
          setMessage({
            message: `Could not be added ${newName}`,
            isError: true,
          })
        })
        .finally(() => {
          setTimeout(() => {
            setMessage({ message: null, isError: false })
          }, 5000)
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
          setMessage({
            message: `Delete ${name}`,
          })
        })
        .catch((error) => {
          console.log(error)
          setMessage({
            message: `Information of ${name} has already been removed from server`,
            isError: true,
          })
        })
        .finally(() => {
          setTimeout(() => {
            setMessage({ message: null, isError: false })
          }, 5000)
        })
    }
  }

  return (
    <>
      <header>
        <h1>Phonebook</h1>
        <Notification isError={message.isError} message={message.message} />

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
