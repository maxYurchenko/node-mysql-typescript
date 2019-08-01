import { Request, Response } from 'express';
import userModel from '../models/userModel';

class UserController {
  getUsers = (req: Request, res: Response) => {
    userModel.getUsers((err, result) => {
      if (err) {
        res.status(200).json({
          success: false,
          message: 'Database error'
        });
      } else {
        res.status(200).json({
          result,
          success: true
        });
      }
    });
  };
}
export default new UserController();
