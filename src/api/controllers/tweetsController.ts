import { Request, Response } from 'express';
import tweetModel from '../models/tweetModel';

class TweetsController {
  createTweet = (req: Request, res: Response) => {
    let params = req.body;
    tweetModel.createTweet(params, (err, result) => {
      if (err) {
        res.status(500).send({
          success: false
        });
      } else {
        res.status(200).send({
          success: true
        });
      }
    });
  };
}
export default new TweetsController();
