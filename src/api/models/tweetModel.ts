import mysql, { MysqlError } from 'mysql';

class TweetModel {
  private getDBConn = () => {
    return mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.MYSQL_PORT as any,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  };
  createTweet = (params: any, callback: (err: MysqlError | null, res: [] | null) => void) => {
    var con = this.getDBConn();
    console.log(params);
    if (!params.parent) {
      params.parent = null;
    }
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
}

export default new TweetModel();
