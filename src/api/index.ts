import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/authRouter';
import usersRouter from './routes/usersRouter';
import tweetsRouter from './routes/tweetsRouter';

const api = express();

api.use(bodyParser.json());
api.use(cors());
api.use(
  bodyParser.urlencoded({
    extended: true
  })
);

api.use('/users/', usersRouter);
api.use('/tweet/', tweetsRouter);
api.use('/auth/', authRouter);

export default api;
