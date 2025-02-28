import 'dotenv/config';
import express from 'express';
import { connectDb } from './config/db.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is ready!');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`> Server started at: http://localhost:${process.env.SERVER_PORT}`);
  connectDb();
});
