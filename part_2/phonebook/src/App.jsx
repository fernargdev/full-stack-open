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

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        console.log(error)
      })
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

// 2.17: Guía telefónica Paso9

// Permita que los usuarios eliminen entradas de la agenda.
// La eliminación se puede realizar a través de un botón dedicado
// para cada persona en la lista de la agenda. Puede confirmar
// la acción del usuario utilizando el método window.confirm:

// El recurso asociado para una persona en el backend se puede eliminar
// haciendo una solicitud HTTP DELETE a la URL del recurso. Si estamos eliminando,
// por ejemplo, una persona que tiene el id 2, tendríamos que hacer una solicitud
// HTTP DELETE a la URL localhost:3001/persons/2. No se envían datos con la solicitud.

// Puede realizar una solicitud HTTP DELETE con la librería axios de la misma
// manera que hacemos todas las demás solicitudes.

// NB: No puede usar el nombre delete para una variable porque es una palabra reservada
// en JavaScript. Por ejemplo, lo siguiente no es posible:
