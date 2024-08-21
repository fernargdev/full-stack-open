import express from 'express';

import diagnosesRouter from './routes/diagnoses';

const app = express();

import cors from 'cors';

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Ping request received');
  res.json({ message: 'pong' });
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
