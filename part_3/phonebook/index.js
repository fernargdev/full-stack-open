const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

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
  response.send('<h1>Phonebook API</h1>')
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

// 3.8*: Paso 8 del backend de la agenda telefónica
// Configure Morgan para que también muestre los datos
// enviados en las solicitudes HTTP POST:

// Tenga en cuenta que registrar datos incluso en la consola
// puede ser peligroso ya que puede contener datos confidenciales
// y puede violar la ley de privacidad local (por ejemplo, GDPR en la UE) o
// el estándar comercial. En este ejercicio, no tiene que preocuparse por
// cuestiones de privacidad, pero en la práctica, intente no registrar
// ningún dato confidencial.

// Este ejercicio puede resultar bastante desafiante, aunque
// la solución no requiere mucho código.

// Este ejercicio se puede completar de diferentes maneras.
// Una de las posibles soluciones utiliza estas dos técnicas:

// creando nuevos tokens:
// https://github.com/expressjs/morgan#creating-new-tokens
// JSON.stringify:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
