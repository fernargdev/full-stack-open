const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/', (request, response) => {
  response.send('<h1> Hello World! </h1>')
})

app.get('/info', (request, response) => {
  response.send(
    `
    <p>
    Phonebook has info for ${persons.length} people 
    <br/><br/>
    ${new Date()}
    </p>
    `
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateRandomId = () => Math.floor(Math.random() * 10000) + 1

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) return response.status(400).json({ error: 'name missing' })

  if (!body.number)
    return response.status(400).json({ error: 'number missing' })

  if (persons.find((person) => person.name === body.name))
    return response.status(400).json({ error: 'name must be unique' })

  const person = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`)
})

// 3.6: Paso 6 del backend de la agenda telefónica
// Implementar manejo de errores para crear nuevas entradas.
// La solicitud no podrá prosperar si:

// Falta el nombre o el número ✅
// El nombre ya existe en la agenda. ✅

// Responda a solicitudes como estas con el código de estado
// apropiado y también envíe información que explique el motivo del error, por ejemplo:

// { error: 'name must be unique' }
