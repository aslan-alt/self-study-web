import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export const api = {
  createCourse: '/api/Course/createCourse',
  getAllCourses: '/api/Course/getAllCourses',
  registerUser: '/api/user/registerUser',
  uploadImage: '/api/Image/uploadImage',
  uploadVideo: '/api/Video/uploadVideo',
  getVideos: 'api/Video/getVideos',
  mergeSlices: '/api/Video/merge',
  login: 'api/user/signIn',
};
