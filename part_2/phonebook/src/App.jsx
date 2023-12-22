import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
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

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <>
      <header>
        <h2>Phonebook</h2>
      </header>

      <main>
        <form onSubmit={addName}>
          <div>
            <label>Name: </label>
            <input type="text" value={newName} onChange={handleNameChange} />
          </div>
          <div>
            <label>Number: </label>
            <input type="tel" value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </main>

      <footer>
        <h2>Numbers</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name}: {person.number}
            </li>
          ))}
        </ul>
      </footer>

      <div>newName: {newName}</div>
      <div>newNumber: {newNumber}</div>
    </>
  )
}

export default App
