import {Video} from '@/DB/entity';
import {axios, api} from './config';

export const getVideos = async (id: number) => {
  return await axios.post<{video?: Video}>(api.getVideos, {id});
};
