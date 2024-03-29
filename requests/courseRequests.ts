import axios from 'axios';
import {api} from './config';

export enum CourseType {
  FE = 0,
}

export type CreateCoursesRequest = {
  title: string;
  type: CourseType;
  author: number;
};
export type CreateCoursesResponse = {
  id: number;
  type: CourseType;
  updatedAt: string;
  createdAt: string;
  title: string;
};

export const createCourse = async (data: CreateCoursesRequest) => {
  return await axios.post<CreateCoursesResponse>(api.createCourse, data);
};
