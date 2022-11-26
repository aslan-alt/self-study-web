import axios from 'axios';
import {Video} from '@/DB/entity';
import {api} from './config';

export const uploadVideo = async (data: FormData) => {
  return await axios.post<{video?: Video}>(api.uploadVideo, data);
};
