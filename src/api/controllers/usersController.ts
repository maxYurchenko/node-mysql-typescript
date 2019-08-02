import { Request, Response } from 'express';
import userModel from '../models/userModel';

class UserController {
  getUsers = (req: Request, res: Response) => {
    userModel.getAllUsers().then(users => {
      res.send({
        users,
        success: true
      });
    });
  };
  getUserById = (req: Request, res: Response) => {
    let id = req.params.id ? req.params.id : null;
    if (!id)
      res.send({
        success: false,
        message: 'id is required'
      });
    userModel.getUserById(id).then(user => {
      res.send({
        user,
        success: true
      });
    });
  };
}
export default new UserController();
