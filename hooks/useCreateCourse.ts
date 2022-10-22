import {useMutation} from 'react-query';
import {createCourse} from '../requests';

export const useCreateCourse = () => {
  return useMutation(createCourse);
};
