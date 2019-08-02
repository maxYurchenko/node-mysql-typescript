import { Router } from 'express';
import likeController from '../controllers/likeController';
const likesRouter = Router();

likesRouter.get('/:id', likeController.likeTweet);

export default likesRouter;
