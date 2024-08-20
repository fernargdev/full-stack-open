import express from 'express'
const app = express()

import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' })
  }

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' })
  }

  const bmi = calculateBmi(height, weight)

  res.status(200).json({ weight, height, bmi })
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
