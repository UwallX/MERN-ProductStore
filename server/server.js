import 'dotenv/config';
import express from 'express';
import { connectDb } from './config/db.js';
import routes from './routes/index.js';

const PORT = process.env.SERVER_PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`> Server started at: http://localhost:${PORT}`);
  connectDb();
});
