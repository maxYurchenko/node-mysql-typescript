import express from 'express';
import api from './api';
import { createConnection } from 'typeorm';
import authController from './api/controllers/authController';
const app = express();
const port = 8001;

createConnection()
  .then(async connection => {
    app.use('/api/v1/', authController.isAuthenticated, api);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));
