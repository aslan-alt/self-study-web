import {MergeSlicesRequest} from '../pages/api/Video/merge';
import {axios, api} from './config';

export const mergeSlices = async (request: MergeSlicesRequest) => {
  return await axios.post(api.mergeSlices, request);
};
