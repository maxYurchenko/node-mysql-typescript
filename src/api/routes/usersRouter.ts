import { Router } from 'express';
import usersController from '../controllers/usersController';
const usersRouter = Router();
usersRouter.get('/get/all', usersController.getUsers);
usersRouter.get('/get/:id', usersController.getUserById);
export default usersRouter;
