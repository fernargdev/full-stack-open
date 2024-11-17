import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  res.status(200).json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNaN)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);

    res.status(200).json(result);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';

    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }

    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
