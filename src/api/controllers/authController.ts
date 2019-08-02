import { Request, Response } from 'express';
import userModel from '../models/userModel';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  sub: string;
}

class authController {
  private getToken = (userId: number) => {
    const test = {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      sub: userId.toString()
    };
    return jwt.sign(test, 'secret');
  };
  private verifyToken = (token: string) => {
    try {
      return (jwt.verify(token, 'secret') as DecodedToken).sub;
    } catch (err) {}
    return null;
  };
  private extractBasicToken = (authorization: string) => {
    let authHeader = authorization.split(' ');
    if (authHeader[0] === 'Basic') {
      return Buffer.from(authHeader[1], 'base64')
        .toString()
        .split(':');
    }
    return null;
  };
  private extractBearerToken = (authorization: string) => {
    let authHeader = authorization.split(' ');
    if (authHeader[0] === 'Bearer') {
      return this.verifyToken(authHeader[1]);
    }
    return null;
  };
  isAuthenticated = (req: Request, res: Response, next: () => void) => {
    req.user = this.extractBearerToken(req.headers.authorization || '');
    return next();
  };
  signin = (req: Request, res: Response) => {
    if (!req.headers.authorization) {
      res.status(200).json({
        success: false,
        message: 'Authorization header required.'
      });
    }
    let auth = this.extractBasicToken(req.headers.authorization || '');
    if (!auth) {
      res.status(200).json({
        success: false,
        message: 'Authorization header is not extracted successfully'
      });
      return null;
    }
    userModel.findByEmailPass(auth[0], auth[1]).then(user => {
      if (!user) {
        res.status(200).json({
          success: false,
          message: 'User not found'
        });
        return null;
      }
      res.status(200).json({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: this.getToken(user.id),
        success: true
      });
    });
  };
  signup = (req: Request, res: Response) => {
    let params = req.body;
    if (!params.email || !params.password) {
      res.status(200).json({
        success: false,
        message: 'Both email and password required'
      });
    }
    userModel.checkUserExixts(params.email).then(user => {
      res.send({
        user,
        success: true
      });
    });
    params.firstName = params.firstName ? params.firstName : null;
    params.lastName = params.lastName ? params.lastName : null;
    userModel.createUser(params).then(user => {
      res.status(200).json({
        success: true,
        user
      });
    });
  };
}
export default new authController();
