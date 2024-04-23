import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { isAuthenticated } from './middlewares/index.js';
import connectToMongoDB from './connection/index.js';
import auth from './auth/index.js';
import users from './users/index.js';
import { get500 } from './errorHandlers/index.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use('/auth', auth);
app.use(isAuthenticated, users);
connectToMongoDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Running on port 3000');
    });
  })
  .catch(() => {
    app.use(get500);
  });
