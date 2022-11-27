import React, {FC, useEffect, useState} from 'react';
import {CloudUploadOutlined} from '@ant-design/icons';
import {Button, Typography, notification} from 'antd';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {UploadInput} from '@/components/UploadInput';
import {VideoDetailInfo} from '@/components/VideoDetailInfo';

type Props = {
  course: Course;
};

export const VideoForm: FC<Props> = ({course}) => {
  const [videoFile, setVideoFile] = useState<File>();

  const clearVideoState = () => {
    setVideoFile(undefined);
  };

  useEffect(() => {
    return clearVideoState;
  }, []);

  return (
    <>
      {videoFile ? (
        <VideoDetailInfo course={course} videoFile={videoFile} />
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
                return;
              }
              setVideoFile(file);
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
