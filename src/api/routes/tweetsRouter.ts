import { Router } from 'express';
import tweetsController from '../controllers/tweetsController';
const tweetsRouter = Router();

tweetsRouter.post('/create', tweetsController.createTweet);
tweetsRouter.get('/get/all', tweetsController.getAllTweets);

export default tweetsRouter;
