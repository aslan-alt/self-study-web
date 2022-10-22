import React, {FC} from 'react';
import {CloudUploadOutlined} from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';

export const UploadInput: FC = () => {
  return (
    <Container>
      <UploadIcon />
      <StyledUploadInput
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
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StyledUploadInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  left: 0;
`;

const UploadIcon = styled(CloudUploadOutlined)`
  font-size: 46px;
  color: #40a9ff;
`;
