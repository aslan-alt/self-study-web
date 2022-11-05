import {Video} from '@/DB/entity';
import {axios, api} from './config';

export const uploadVideo = async (data: FormData) => {
  return await axios.post<{video?: Video}>(api.uploadVideo, data);
};
