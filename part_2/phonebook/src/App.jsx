import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <>
      <header>
        <h2>Phonebook</h2>
      </header>

      <main>
        <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
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
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      </footer>

      <div>newName: {newName}</div>
    </>
  )
}

export default App
