import { User } from '../entity/user';
import { createConnection } from 'typeorm';

class UserModel {
  getAllUsers = () =>
    createConnection().then(async connection => {
      const tweets = await connection.manager.find(User);
      await connection.close();
      return tweets;
    });

  findByEmailPass = (email: string, password: string) =>
    createConnection().then(async connection => {
      const user = await connection.manager.findOne(User, { where: { email, password } });
      await connection.close();
      return user;
    });

  createUser = (params: any) =>
    createConnection().then(async connection => {
      const user = new User();
      user.firstName = params.firstName;
      user.lastName = params.lastName;
      user.email = params.email;
      user.password = params.password;
      await connection.manager.save(user);
      await connection.close();
      return user;
    });
  checkUserExixts = (email: string) =>
    createConnection().then(async connection => {
      const user = await connection.manager.find(User, { where: { email } });
      await connection.close();
      return user;
    });
  getUserById = (id: number) =>
    createConnection().then(async connection => {
      const user = await connection.manager.findOne(User, { where: { id } });
      await connection.close();
      return user;
    });
}

export default new UserModel();
