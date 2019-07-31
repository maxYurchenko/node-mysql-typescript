import mysql, { MysqlError } from 'mysql';
import { User } from '../types/user';

class UserModel {
  private getDBConn = () => {
    return mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.MYSQL_PORT as any,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  };

  getUsers = (callback: (err: MysqlError | null, res: [] | null) => void) => {
    var con = this.getDBConn();
    con.query('SELECT * FROM users', function(err, res, fields) {
      if (err) return callback(err, null);
      callback(null, res);
    });
  };

  findByLoginPass = (
    login: string,
    pass: string,
    callback: (err: MysqlError | null, res: User[] | null) => void
  ) => {
    var con = this.getDBConn();
    let query = 'SELECT * FROM users WHERE login = "' + login + '" and password = "' + pass + '"';
    con.query(query, function(err, res, fields) {
      if (err) return callback(err, null);
      callback(null, res);
    });
  };
}

export default new UserModel();
