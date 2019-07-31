import { Router } from 'express';
import authController from '../controllers/authController';
const authRouter = Router();
authRouter.post('/signin', authController.signin);
export default authRouter;
