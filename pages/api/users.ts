import {withIronSessionApiRoute} from 'iron-session/next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {User} from 'src/entity/User';
import {ironOptions} from '../../lib/withSession';

interface SignData {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export default withIronSessionApiRoute(async (req, res) => {
  const {username, password, passwordConfirmation} = req.body as SignData;
  const connect = await getDatabaseConnection();
  const user = new User();
  user.username = username;
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;
  let found;
  try {
    found = await connect.manager.find(User);
  } catch (e) {
    // console.log(e)
  }

  if (found?.length > 0) {
    user.errors.username.push('用户名已存在');
  }

  await user.validate();
  if (user.hasErrors()) {
    await res.status(422).send(user.errors);
  } else {
    (req.session as any).user = user;
    await req.session.save();
    await connect.manager.save(user);
    await res.status(200).send(user);
  }
}, ironOptions);
