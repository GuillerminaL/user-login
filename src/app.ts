import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import connectToMongoDB from './connection/index.js';
import auth from './auth/index.js';
import { get500 } from './errorHandlers/index.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use('/auth', auth);
connectToMongoDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Running on port 3000');
    });
  })
  .catch(() => {
    app.use(get500);
  });
