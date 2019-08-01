import { Request, Response } from 'express';
import tweetModel from '../models/tweetModel';

class TweetsController {
  createTweet = (req: Request, res: Response) => {
    let params = req.body;
    params.parent = params.parent ? params.parent : null;
    tweetModel.createTweet(params, (err, result) => {
      if (err) {
        res.status(200).json({
          success: false,
          message: 'Database error.'
        });
      } else {
        res.status(200).json({
          success: true
        });
      }
    });
  };
  getAllTweets = (req: Request, res: Response) => {
    tweetModel.getAllTweets((err, result) => {
      if (err) {
        res.status(200).json({
          success: false,
          message: 'Database error.'
        });
      } else {
        res.status(200).json({
          success: true,
          result
        });
      }
    });
  };
}
export default new TweetsController();
