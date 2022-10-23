import {axios} from './config';

export const login = () => {
  return axios.post('api/user/signIn', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: 'aslan-test1234',
      password: '123456122',
    }),
  });
};
