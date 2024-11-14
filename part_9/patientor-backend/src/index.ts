import express, { Request, Response } from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app: express.Application = express();
app.use(express.json());
app.use(cors());

const PORT: number = 3001;

app.get('/api/ping', (_req: Request, res: Response): void => {
  console.log('Ping request received');
  res.json({ message: 'pong' });
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, (): void => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
