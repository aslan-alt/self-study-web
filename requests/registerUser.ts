import axios from 'axios';

export const registerUser = async () => {
  return await axios.post('http://localhost:3000/api/user/registerUser', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: 'aslan-test1234',
      password: '123456122',
      passwordConfirmation: '123456122',
    }),
  });
};
