import { Router } from 'express';
import tweetsController from '../controllers/tweetsController';
const tweetsRouter = Router();

tweetsRouter.post('/create', tweetsController.createTweet);
tweetsRouter.post('/create/:parentId', tweetsController.createTweet);
tweetsRouter.post('/delete/:id', tweetsController.deleteTweet);
tweetsRouter.get('/get/all', tweetsController.getAllTweets);
tweetsRouter.get('/get/user/:userId', tweetsController.getTweetsByUser);
tweetsRouter.get('/get/parent/:parentId', tweetsController.getTweetsByParent);

export default tweetsRouter;
