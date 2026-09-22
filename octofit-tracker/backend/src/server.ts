import express from 'express';
import db, { connectDatabase } from './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  next();
});

app.options(/.*/, (_request, response) => {
  response.sendStatus(204);
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api', apiRouter);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.listen(port, async () => {
  console.log(`OctoFit API listening on port ${port}`);
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
  }
});