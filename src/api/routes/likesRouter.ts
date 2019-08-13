import { Router } from 'express';
import likeController from '../controllers/likeController';
const likesRouter = Router();

likesRouter.post('/:id', likeController.likeTweet);

export default likesRouter;
