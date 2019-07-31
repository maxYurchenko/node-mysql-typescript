import { Request, Response } from 'express';
import userModel from '../models/userModel';

class UserController {
  getUsers = (req: Request, res: Response) => {
    userModel.getUsers((err, result) => {
      if (err) {
        res.status(500).send({
          success: false
        });
      } else {
        res.status(200).send({
          users: result,
          success: true
        });
      }
    });
  };
}
export default new UserController();
