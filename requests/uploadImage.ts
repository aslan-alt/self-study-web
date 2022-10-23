import {axios, api} from './config';

export const uploadImage = async (data: FormData) => {
  return await axios.post(api.uploadImage, data);
};
