import { Request, Response } from 'express';
import tweetModel from '../models/tweetModel';
import { Tweet } from '../entity/tweet';

class TweetsController {
  createTweet = (req: Request, res: Response) => {
    let params = req.body;
    if (!req.user) {
      res.send({
        success: false,
        message: 'please, login'
      });
      return false;
    }
    params.userId = req.user;
    params.parent = req.params.parentId ? req.params.parentId : null;
    tweetModel.createTweet(params).then(tweet => {
      res.send({
        tweet,
        success: true
      });
    });
  };
  getAllTweets = (req: Request, res: Response) => {
    tweetModel.getAllTweets().then((tweets: Tweet[]) => {
      res.send({
        tweets,
        success: true
      });
    });
  };
  getTweetsByUser = (req: Request, res: Response) => {
    tweetModel.getTweetsByUser(req.params.userId).then((tweets: Tweet[]) => {
      res.send({
        tweets,
        success: true
      });
    });
  };
  getTweetsByParent = (req: Request, res: Response) => {
    tweetModel.getTweetsByUser(req.params.parent).then((tweets: Tweet[]) => {
      res.send({
        tweets,
        success: true
      });
    });
  };
  deleteTweet = (req: Request, res: Response) => {
    tweetModel.deleteTweet(req.params.id).then(() => {
      res.send({
        success: true
      });
    });
  };
}
export default new TweetsController();
