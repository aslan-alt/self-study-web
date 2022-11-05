import {SignInRequest} from '../pages/api/user/signIn';
import {api, axios} from './config';

export const login = (request: SignInRequest) => {
  return axios.post(api.login, request);
};
