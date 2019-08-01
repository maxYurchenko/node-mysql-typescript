import mysql, { MysqlError } from 'mysql';
class dbHelper {
  getDBConn = () => {
    return mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.MYSQL_PORT as any,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });
  };
}

export default new dbHelper();
