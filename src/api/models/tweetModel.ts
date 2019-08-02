import { createConnection } from 'typeorm';
import { Tweet } from '../entity/tweet';
import { User } from '../entity/user';
import moment from 'moment';

class TweetModel {
  createTweet = (params: any) =>
    createConnection().then(async connection => {
      const tweet = new Tweet();
      tweet.userId = params.userId;
      tweet.parent = params.parent;
      tweet.body = params.body;
      tweet.createdAt = moment()
        .format('YYYY-MM-DD HH:mm:ss')
        .toString();
      await connection.manager.save(tweet);
      let user = await connection.manager.findOne(User, { where: { id: tweet.userId } });
      if (user) tweet.user = user;
      await connection.close();
      return tweet;
    });
  getAllTweets = () =>
    createConnection().then(async connection => {
      const tweets = await connection.manager.find(Tweet, { relations: ['user'] });
      await connection.close();
      return tweets;
    });

  getTweetsByUser = (userId: number) =>
    createConnection().then(async connection => {
      const tweets = await connection.manager.find(Tweet, {
        where: { userId: userId },
        relations: ['user']
      });
      await connection.close();
      return tweets;
    });
  getTweetById = (id: number) =>
    createConnection().then(async connection => {
      const tweets = await connection.manager.find(Tweet, {
        where: { id },
        relations: ['user']
      });
      await connection.close();
      return tweets;
    });
  getTweetByParent = (parent: number) =>
    createConnection().then(async connection => {
      const tweets = await connection.manager.find(Tweet, {
        where: { parent },
        relations: ['user']
      });
      await connection.close();
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
  likeTweet = (id: number) =>
    createConnection().then(async connection => {
      await connection.close();
    });
}

export default new TweetModel();
