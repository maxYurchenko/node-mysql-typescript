import { getManager } from 'typeorm';
import { Tweet } from '../entity/tweet';
import { User } from '../entity/user';
import LikeModel from './likeModel';
import { Request } from 'express';

class TweetModel {
  createTweet = async (params: any) => {
    const tweetRepository = getManager().getRepository(Tweet);
    const userRepository = getManager().getRepository(User);
    const tweet = new Tweet();
    tweet.userId = parseInt(params.userId);
    tweet.parent = params.parent;
    tweet.body = params.body;
    tweet.createdAt = new Date();
    await tweetRepository.save(tweet);
    let user = await userRepository.findOne({ where: { id: tweet.userId } });
    if (user) tweet.user = user;
    return tweet;
  };
  getAllTweets = async (req: Request) => {
    const tweetRepository = getManager().getRepository(Tweet);
    const tweets = await tweetRepository.manager.find(Tweet, {
      relations: ['user'],
      where: { parent: null, deleted: 0 }
    });
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
  };

  getTweetsByUser = async (req: Request) => {
    const tweetRepository = getManager().getRepository(Tweet);
    const tweets = await tweetRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.user', 'user')
      .where({ parent: null, userId: req.params.userId, deleted: 0 })
      .getMany();
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
  };
  getTweetByParent = async (req: Request) => {
    const tweetRepository = getManager().getRepository(Tweet);
    const tweets = await tweetRepository.find({
      where: { parent: req.params.parent, deleted: 0 },
      relations: ['user']
    });
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
  };
  deleteTweet = async (id: number) => {
    const tweetRepository = getManager().getRepository(Tweet);
    const tweets = await tweetRepository
      .createQueryBuilder()
      .update(Tweet)
      .set({ deleted: 1 })
      .where('id = :id', { id })
      .execute();
    return tweets;
  };
  getById = async (req: Request) => {
    const tweetRepository = getManager().getRepository(Tweet);
    const tweet = await tweetRepository.findOne({
      where: { id: req.params.tweetId, deleted: 0 },
      relations: ['user']
    });
    if (req.user && tweet) {
      tweet.liked = await LikeModel.isLiked(req.user as any, tweet.id);
    }
    return tweet;
  };
}

export default new TweetModel();
