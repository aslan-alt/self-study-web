import React, {FC} from 'react';
import axios from 'axios';

export const UploadInput: FC = () => {
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const chunkSize = 1024 * 1024;
          const file = e?.target?.files?.[0];
          if (file) {
            const spliceNumber = Math.round(file.size / chunkSize);
            const [fileName, suffix] = file.name.split('.');
            const uploadRequests = Array.from(new Array(spliceNumber).keys()).map((start) => {
              return new Promise((resolve, reject) => {
                const formData = new FormData();
                const blobName = `${fileName}-${start}.${suffix}`;
                const blob = file.slice(start * chunkSize, (start + 1) * chunkSize);

                formData.append('file', new File([blob], blobName, {type: 'video/mp4'}));
                axios.post('/api/v1/upload', formData).then(resolve, reject);
              });
            });
            Promise.all(uploadRequests).then(() =>
              axios.post('/api/v1/merge', {chunkDir: fileName})
            );
          }
        }}
      />
    </div>
  );
};
