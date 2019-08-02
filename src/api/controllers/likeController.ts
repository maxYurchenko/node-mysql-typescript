import { Request, Response } from 'express';
import likeModel from '../models/likeModel';

class LikesController {
  likeTweet = (req: Request, res: Response) => {
    if (!req.user) {
      res.send({
        success: false,
        message: 'please, login'
      });
      return false;
    }
    likeModel.likeTweet(req.user, req.params.id).then(() => {
      res.send({
        success: true
      });
    });
  };
}
export default new LikesController();
