import { User } from '../types/user';
import dbHelper from '../helpers/db';
import { MysqlError } from 'mysql';

class UserModel {
  getUsers = (callback: (err: MysqlError | null, res: [] | null) => void) => {
    var con = dbHelper.getDBConn();
    con.query('SELECT * FROM users', function(err, res, fields) {
      if (err) return callback(err, null);
      callback(null, res);
    });
  };

  findByEmailPass = (
    email: string,
    pass: string,
    callback: (err: MysqlError | null, res: User[] | null) => void
  ) => {
    var con = dbHelper.getDBConn();
    let query = 'SELECT * FROM users WHERE email = "' + email + '" and password = "' + pass + '"';
    con.query(query, function(err, res, fields) {
      if (err) return callback(err, null);
      callback(null, res);
    });
  };

  createUser = (params: any, callback: (err: MysqlError | null, res: [] | null) => void) => {
    var con = dbHelper.getDBConn();
    var query =
      'INSERT INTO users (firstName, lastName, email, password) VALUES ("' +
      params.firstName +
      '", "' +
      params.lastName +
      '", "' +
      params.email +
      '", "' +
      params.password +
      '")';
    con.query(query, function(err, res, fields) {
      if (err) return callback(err, null);
      callback(null, res);
    });
  };
  checkUserExixts = (email: string, callback: (err: MysqlError | null, res: [] | null) => void) => {
    var con = dbHelper.getDBConn();
    var query = 'SELECT email FROM users where email = "' + email + '"';
    con.query(query, function(err, res, fields) {
      if (err) callback(err, null);
      else if (!res || !res.length) callback(null, null);
      else callback(null, res);
    });
  };
}

export default new UserModel();
