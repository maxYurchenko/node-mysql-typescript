import { createConnection } from 'typeorm';
import { Tweet } from '../entity/tweet';
import { User } from '../entity/user';
import LikeModel from './likeModel';
import { Request } from 'express';

class TweetModel {
  createTweet = (params: any) =>
    createConnection().then(async connection => {
      const tweet = new Tweet();
      tweet.userId = parseInt(params.userId);
      tweet.parent = params.parent;
      tweet.body = params.body;
      tweet.createdAt = new Date();
      await connection.manager.save(tweet);
      let user = await connection.manager.findOne(User, { where: { id: tweet.userId } });
      if (user) tweet.user = user;
      await connection.close();
      return tweet;
    });
  getAllTweets = (req: Request) =>
    createConnection().then(async connection => {
      const tweets = await connection.manager.find(Tweet, {
        relations: ['user'],
        where: { parent: null, deleted: 0 }
      });
      await connection.close();
      if (req.user) {
        const tweetsPromise = tweets.map(async tweet => {
          const liked = await LikeModel.isLiked(req.user as any, tweet.id);
          return {
            ...tweet,
            liked
          };
        });
        return await Promise.all(tweetsPromise);
      }
      return tweets;
    });

  getTweetsByUser = (req: Request) =>
    createConnection().then(async connection => {
      const tweets = await connection.manager
        .createQueryBuilder(Tweet, 't')
        .leftJoinAndSelect('t.user', 'user')
        .where({ parent: null, userId: req.params.userId, deleted: 0 })
        .getMany();
      await connection.close();
      if (req.user) {
        const tweetsPromise = tweets.map(async tweet => {
          const liked = await LikeModel.isLiked(req.user as any, tweet.id);
          return {
            ...tweet,
            liked
          };
        });
        return await Promise.all(tweetsPromise);
      }
      return tweets;
    });
  getTweetByParent = (req: Request) =>
    createConnection().then(async connection => {
      const tweets = await connection.manager.find(Tweet, {
        where: { parent: req.params.parent, deleted: 0 },
        relations: ['user']
      });
      await connection.close();
      if (req.user) {
        const tweetsPromise = tweets.map(async tweet => {
          const liked = await LikeModel.isLiked(req.user as any, tweet.id);
          return {
            ...tweet,
            liked
          };
        });
        return await Promise.all(tweetsPromise);
      }
      return tweets;
    });
  deleteTweet = (id: number) =>
    createConnection().then(async connection => {
      const tweets = await connection.manager
        .createQueryBuilder()
        .update(Tweet)
        .set({ deleted: 1 })
        .where('id = :id', { id })
        .execute();
      await connection.close();
      return tweets;
    });
  getById = (req: Request) =>
    createConnection().then(async connection => {
      const tweet = await connection.manager.findOne(Tweet, {
        where: { id: req.params.tweetId, deleted: 0 },
        relations: ['user']
      });
      await connection.close();
      if (req.user && tweet) {
        tweet.liked = await LikeModel.isLiked(req.user as any, tweet.id);
      }
      return tweet;
    });
}

export default new TweetModel();
