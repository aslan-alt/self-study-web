import {NextApiHandler} from 'next';
import {User} from '@/DB/entity';
import {getConnection} from '@/DB/getConnection';

export interface RegisterUserRequest {
  username: string;
  password: string;
  passwordConfirmation: string;
}

const registerUser: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body as RegisterUserRequest;
  const connection = await getConnection();

  const userRepository = await connection.getRepository(User);

  const user = new User();
  user.username = username;
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;

  try {
    const found = await userRepository.findOneBy({username});
    found && user.errors.username.push('用户名已存在');
  } catch (error) {
    await res.status(500).send({error});
  }

  await user.validate();
  if (user.hasErrors()) {
    await res.status(422).send(user.errors);
  } else {
    await userRepository.save(user);
    await res.status(200).send(user);
  }
};

export default registerUser;
