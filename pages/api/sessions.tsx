import {withIronSessionApiRoute} from 'iron-session/next';
import {NextApiHandler} from 'next';
import {SignIn} from 'src/model/SignIn';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {ironOptions} from '../../lib/withSession';
import {User} from '../../src/entity/User';

const Sessions: NextApiHandler = async (req, res) => {
  const {username, password} = req.body;
  const signIn = new SignIn();
  signIn.password = password;
  signIn.username = username;
  const connection = await getDatabaseConnection();
  await signIn.validate();
  if (signIn.hasErrors()) {
    res.status(422).json(signIn.errors);
    return;
  } else {
    (req.session as any).user = await connection.manager.findOne(User, {where: {username}});
    await req.session.save();
    res.status(200).json(signIn.user);
  }
};
export default withIronSessionApiRoute(Sessions, ironOptions);
