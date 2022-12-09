import axios from 'axios';
import {SignInRequest} from '../pages/api/user/signIn';
import {api} from './config';

export const login = (request: SignInRequest) => {
  return axios.post(api.login, request);
};
