import { Router } from 'express';
import tweetsController from '../controllers/tweetsController';
const tweetsRouter = Router();

tweetsRouter.post('/create', tweetsController.createTweet);

/*
api.get('/api/v1/get/tweets', (req, res) => {
  var con = getDBConn();
  con.query('SELECT * FROM tweet', (err, result, fields) => {
    if (err) throw err;
    res.status(200).send({
      success: true,
      tweets: result
    });
  });
});
*/

export default tweetsRouter;
