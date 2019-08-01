import dbHelper from '../helpers/db';
import { MysqlError } from 'mysql';

class TweetModel {
  createTweet = (params: any, callback: (err: MysqlError | null, res: [] | null) => void) => {
    var con = dbHelper.getDBConn();
    var query =
      'INSERT INTO tweet (body, userId, parent) VALUES ("' +
      params.body +
      '", "' +
      params.userId +
      '", ' +
      params.parent +
      ')';
    con.query(query, function(err, res, fields) {
      if (err) return callback(err, null);
      callback(null, res);
    });
  };
  getAllTweets = (callback: (err: MysqlError | null, res: [] | null) => void) => {
    var con = dbHelper.getDBConn();
    con.query('SELECT * FROM tweet', function(err, res, fields) {
      if (err) return callback(err, null);
      callback(null, res);
    });
  };
}

export default new TweetModel();
