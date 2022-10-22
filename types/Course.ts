export enum CourseType {
  FE = 0,
}

export type CreateCoursesRequest = {
  title: string;
  type: CourseType;
  author: number;
};
