import {NextApiHandler} from 'next';
import {SignIn} from '@/DB/validation/SignInValidation';

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
    res.status(401).json({status: 'faild', error: signInValidation.errors});
  } else {
    res.status(200).json({data: '登陆成功'});
  }
};

export default signIn;
