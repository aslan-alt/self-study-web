import axios from 'axios';
import {Course} from '@/DB/entity';
import {api} from './config';

export const getAllCourses = async () => {
  return await axios.get<{courses?: Course[]}>(api.getAllCourses);
};
