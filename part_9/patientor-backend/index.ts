import express from 'express';
const app = express();

app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  console.log('Ping request received');
  res.json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
