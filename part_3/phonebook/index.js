const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

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

// 3.7: Paso 7 del backend de la agenda telefónica
// Agregue el middleware morgan a su aplicación para iniciar sesión.
// Configúrelo para registrar mensajes en su consola según
// la tiny configuración.

// La documentación de Morgan no es la mejor y
// es posible que tengas que dedicar algo de tiempo
// a descubrir cómo configurarla correctamente.
// Sin embargo, la mayor parte de la documentación
// del mundo pertenece a la misma categoría, por lo que
// es bueno aprender a descifrar e interpretar documentación
// críptica en cualquier caso.

// Morgan se instala como todas las demás bibliotecas con el
// comando npm install . La puesta en uso de Morgan ocurre de
// la misma manera que la configuración de cualquier otro middleware
// mediante el comando app.use .
