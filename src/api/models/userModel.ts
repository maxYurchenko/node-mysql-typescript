import { User } from '../entity/user';
import { getManager } from 'typeorm';

class UserModel {
  getAllUsers = async () => {
    const userRepository = getManager().getRepository(User);
    const tweets = await userRepository.find();
    return tweets;
  };

  findByEmailPass = async (email: string, password: string) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ where: { email, password } });
    return user;
  };

  createUser = async (params: any) => {
    const userRepository = getManager().getRepository(User);
    const user = new User();
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.password = params.password;
    await userRepository.save(user);
    return user;
  };
  checkUserExixts = async (email: string) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.find({ where: { email } });
    return user;
  };
  getUserById = async (id: number) => {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    return user;
  };
}

export default new UserModel();
