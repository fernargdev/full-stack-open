import express from 'express';

import diaryRouter from './routes/diaries';

const app = express();

app.use(express.json());

const PORT = 3005;

app.get('/ping', (_req, res) => {
  console.log('ping request received');
  res.json({ message: 'pong' });
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});