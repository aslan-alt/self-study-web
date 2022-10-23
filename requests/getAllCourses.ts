import {Course} from '@/DB/entity';
import {api, axios} from './config';

export const getAllCourses = async () => {
  return await axios.get<{courses?: Course[]}>(api.getAllCourses);
};
