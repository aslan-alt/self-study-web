import React, {FC, useEffect, useState} from 'react';
import {CloudUploadOutlined} from '@ant-design/icons';
import {Button, Typography, notification} from 'antd';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {UploadInput} from '@/components/UploadInput';
import {VideoDetailInfo, VideoNameAndDescribe} from '@/components/VideoDetailInfo';
import {chunkSize} from '@/constants/index';
import {mergeSlices} from '../requests/mergeSlices';
import {uploadVideo} from '../requests/uploadVideo';

type Props = {
  course?: Course;
};

export const VideoForm: FC<Props> = ({course}) => {
  const [video, setVideo] = useState<File>();
  const [videoNameAndDescribe, setVideoTitleAndDescribe] = useState<VideoNameAndDescribe>();

  const clearVideoState = () => {
    setVideo(undefined);
    setVideoTitleAndDescribe(undefined);
  };

  useEffect(() => {
    return clearVideoState;
  }, []);

  return (
    <>
      {video ? (
        <VideoDetailInfo
          videoNameAndDescribe={videoNameAndDescribe}
          setVideoTitleAndDescribe={setVideoTitleAndDescribe}
        />
      ) : (
        <Container>
          <UploadIcon />
          <Typography.Text>拖放要上传的视频文件</Typography.Text>
          <Typography.Text type="secondary">您的视频在审核通过前之前将仅自己可见。</Typography.Text>
          <StyledSelectButton type="primary">选择文件</StyledSelectButton>
          <UploadInput
            type="file"
            onChange={(e) => {
              const file = e?.target?.files?.[0];
              if (file?.type !== 'video/mp4') {
                notification.error({
                  message: '类型错误',
                  description: '目前只支持MP4格式的视频哦.',
                });
              } else {
                const spliceNumber = Math.round(file.size / chunkSize);
                const [fileName, suffix] = file.name.split('.');
                const uploadRequests = Array.from(new Array(spliceNumber).keys()).map((start) => {
                  return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    const blobName = `${fileName}-${start}.${suffix}`;
                    const blob = file.slice(start * chunkSize, (start + 1) * chunkSize);

                    formData.append('file', new File([blob], blobName, {type: 'video/mp4'}));
                    uploadVideo(formData).then(resolve, reject);
                  });
                });
                Promise.all(uploadRequests).then(() =>
                  mergeSlices({fileName, courseId: course.id})
                );
                setVideo(file);
                setVideoTitleAndDescribe({name: file.name?.replace('.mp4', '')});
              }
            }}
          />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: relative;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UploadIcon = styled(CloudUploadOutlined)`
  font-size: 62px;
  color: var(--mt-upload-icon-color);
  background: var(--mt-upload-icon-background);
  width: 136px;
  height: 136px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-bottom: var(--mt-spacing-3x);
`;

const StyledSelectButton = styled(Button)`
  margin-top: var(--mt-spacing-3x);
`;
