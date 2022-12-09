import {useQuery} from 'react-query';
import {getVideos} from '../requests/getVideos';

export const useGetVideos = (id: string) => {
  return useQuery(['useGetVideos', id], async ({queryKey}) => {
    return await getVideos(Number(queryKey[1])).then((res) => res.data);
  });
};
