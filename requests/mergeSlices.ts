import axios from 'axios';
import {MergeSlicesRequest} from '../pages/api/video/merge';
import {api} from './config';

export const mergeSlices = async (request: MergeSlicesRequest) => {
  return await axios.post(api.mergeSlices, request);
};
