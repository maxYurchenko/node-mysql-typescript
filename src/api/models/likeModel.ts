import { createConnection } from 'typeorm';
import { Like } from '../entity/like';
import tweetModel from './tweetModel';
import { Request } from 'express';

class LikeModel {
  likeTweet = (req: Request) =>
    createConnection().then(async connection => {
      let alreadyLiked = await connection.manager.findOne(Like, {
        where: { userId: parseInt(req.user as any), tweetId: req.params.id }
      });
      if (alreadyLiked) {
        await connection.manager
          .createQueryBuilder()
          .delete()
          .from(Like)
          .where('userId = :userId', { userId: req.user })
          .andWhere('tweetId = :tweetId', { tweetId: req.params.id })
          .execute();
      } else {
        const like = new Like();
        like.userId = parseInt(req.user as any);
        like.tweetId = req.params.id;
        await connection.manager.save(like);
      }
      await connection.close();
      req.params = { tweetId: req.params.id };
      const tweet = await tweetModel.getById(req);
      return tweet;
    });
  isLiked = (userId: number, tweetId: number) =>
    createConnection().then(async connection => {
      let alreadyLiked = await connection.manager.findOne(Like, { where: { userId, tweetId } });
      await connection.close();
      if (alreadyLiked) {
        return true;
      } else {
        return false;
      }
    });
}

export default new LikeModel();
