import axios from 'axios';
import {Video} from '@/DB/entity';
import {api} from './config';

export const getVideos = async (id: number) => {
  return await axios.post<{video?: Video}>(api.getVideos, {id});
};
