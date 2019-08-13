import { Request, Response } from 'express';
import likeModel from '../models/likeModel';
import { Tweet } from '../entity/tweet';

class LikesController {
  likeTweet = (req: Request, res: Response) => {
    if (!req.user) {
      res.send({
        success: false,
        message: 'please, login'
      });
      return false;
    }
    likeModel.likeTweet(req).then(tweet => {
      res.send({
        success: true,
        tweet
      });
    });
  };
}
export default new LikesController();
