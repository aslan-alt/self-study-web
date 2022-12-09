import axios from 'axios';
import {api} from './config';

export const registerUser = async () => {
  return await axios.post(api.registerUser, {
    username: 'aslan-test1234',
    password: '123456122',
    passwordConfirmation: '123456122',
  });
};
