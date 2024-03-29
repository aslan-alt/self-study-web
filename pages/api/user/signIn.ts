import {NextApiHandler} from 'next';
import {SignIn} from '@/DB/validation/SignInValidation';
import {withSessionRoute} from '@/lib/withSession';

export type SignInRequest = {
  username: string;
  password: string;
};

const signIn: NextApiHandler = async (req, res) => {
  const {username, password} = req.body;

  const signInValidation = new SignIn();
  signInValidation.username = username;
  signInValidation.password = password;

  await signInValidation.validate();
  if (signInValidation.hasErrors()) {
    res.status(401).json({status: 'Login failed', error: signInValidation.errors});
  } else {
    if (signInValidation.user) {
      req.session.user = signInValidation.user;
      await req.session.save();
    }
    res.status(200).json({data: '登陆成功'});
  }
};

export default withSessionRoute(signIn);
