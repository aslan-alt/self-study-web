import {Course} from '@/DB/entity';
import {api} from './config';

export const getAllCourses = async () => {
  // TODO: replace fetch with axios
  return await fetch('http://localhost:3000' + api.getAllCourses)
    .then((res) => {
      return (res.json() ?? {}) as {courses?: Course[]};
    })
    // eslint-disable-next-line no-console
    .catch((e) => console.log(e));
};
