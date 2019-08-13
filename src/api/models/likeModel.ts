import { getManager } from 'typeorm';
import { Like } from '../entity/like';
import tweetModel from './tweetModel';
import { Request } from 'express';

class LikeModel {
  likeTweet = async (req: Request) => {
    const likeRepository = getManager().getRepository(Like);
    let alreadyLiked = await likeRepository.findOne({
      where: { userId: parseInt(req.user as any), tweetId: req.params.id }
    });
    if (alreadyLiked) {
      await likeRepository
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
      await likeRepository.save(like);
    }
    req.params = { tweetId: req.params.id };
    const tweet = await tweetModel.getById(req);
    return tweet;
  };
  isLiked = async (userId: number, tweetId: number) => {
    const likeRepository = getManager().getRepository(Like);
    let alreadyLiked = await likeRepository.findOne({ where: { userId, tweetId } });
    if (alreadyLiked) {
      return true;
    } else {
      return false;
    }
  };
}

export default new LikeModel();
