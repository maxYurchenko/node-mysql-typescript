import { createConnection } from 'typeorm';
import { Like } from '../entity/like';

class LikeModel {
  likeTweet = (userId: number | string, tweetId: number) =>
    createConnection().then(async connection => {
      let alreadyLiked = await connection.manager.findOne(Like, { where: { userId, tweetId } });
      if (alreadyLiked) {
        await connection.manager.delete(Like, { where: { userId, tweetId } });
      } else {
        const like = new Like();
        like.userId = userId;
        like.tweetId = tweetId;
        await connection.manager.save(like);
      }
      await connection.close();
    });
}

export default new LikeModel();
