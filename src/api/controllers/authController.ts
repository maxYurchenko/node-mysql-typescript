import { Request, Response } from 'express';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';

class authController {
  private getToken = (userId: number) => {
    return jwt.sign({ userId }, 'secret');
  };
  private verifyToken = (token: string) => {
    var result: object | string | null = null;
    try {
      result = jwt.verify(token, 'secret');
    } catch (err) {}
    return result;
  };
  signin = (req: Request, res: Response) => {
    let params = req.body;
    if (!req.headers.authorization) {
      res.status(400).send({
        success: false
      });
    }
    let authHeader = req.headers.authorization || '';
    var auth = Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');
    userModel.findByLoginPass(auth[0], auth[1], (err, result) => {
      if (err || !result || !result[0] || !result.length) {
        res.status(400).send({
          success: false
        });
      } else {
        let user = result[0];
        res.status(200).json({
          userId: user.id,
          login: user.login,
          firstName: user.firstName,
          lastName: user.lastName,
          token: this.getToken(user.id),
          success: true
        });
      }
    });
  };
}
export default new authController();
