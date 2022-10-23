import {Image} from '@/DB/entity';
import {axios, api} from './config';

export const uploadImage = async (data: FormData) => {
  return await axios.post<{image?: Image}>(api.uploadImage, data);
};
