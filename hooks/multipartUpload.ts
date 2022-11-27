import {useMutation} from 'react-query';
import {chunkSize} from '@/constants/index';
import {mergeSlices} from '../requests/mergeSlices';
import {uploadVideo} from '../requests/uploadVideo';

export const useMultipartUpload = (courseId?: number) => {
  return useMutation(async (videoFile: File) => {
    const [fileName, suffix] = videoFile.name.split('.');
    const uploadRequests = Array.from(new Array(Math.round(videoFile.size / chunkSize)).keys()).map(
      (start) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          const blobName = `${fileName}-${start}.${suffix}`;
          const blob = videoFile.slice(start * chunkSize, (start + 1) * chunkSize);

          formData.append('file', new File([blob], blobName, {type: 'video/mp4'}));
          uploadVideo(formData).then(resolve, reject);
        });
      }
    );
    await Promise.all(uploadRequests);
    return await mergeSlices({fileName, courseId});
  });
};
