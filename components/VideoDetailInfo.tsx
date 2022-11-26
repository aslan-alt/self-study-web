import React, {FC, useMemo, useState} from 'react';
import {FolderAddOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Typography, Image, notification, Card} from 'antd';
import {isUndefined} from 'lodash';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Course, Image as ImageType} from '@/DB/entity';
import {TitleInput} from '@/components/TitleInput';
import {UploadInput} from '@/components/UploadInput';
import {useMultipartUpload} from '../hooks/multipartUpload';
import {useGetVideos} from '../hooks/useGetVideos';
import {uploadImage} from '../requests/uploadImage';

type Props = {
  course?: Course;
  videoFile?: File;
};

type VideoNameAndDescribe = {
  name?: string;
  description?: string;
};

export const VideoDetailInfo: FC<Props> = ({course, videoFile}) => {
  const router = useRouter();
  const selectedId = String(router.query.id);
  const [videoNameAndDescribe, setVideoTitleAndDescribe] = useState<VideoNameAndDescribe>({
    name: videoFile.name.replace('.mp4', ''),
  });

  const {mutateAsync: multipartUpload, isLoading} = useMultipartUpload(course?.id);
  const {refetch: refetchVideos} = useGetVideos(selectedId);

  const [image, setImage] = useState<ImageType>();
  const url = useMemo(() => window.webkitURL.createObjectURL(videoFile), [videoFile]);
  return (
    <Container>
      <Card>
        <Typography.Title level={5}>详细信息</Typography.Title>
        <TitleInput
          title="标题（必填)"
          placeholder="添加一个可描述您视频的标题"
          value={videoNameAndDescribe?.name}
          onChange={(e) => {
            setVideoTitleAndDescribe((videoInfo) => ({
              ...videoInfo,
              name: e.target.value,
            }));
          }}
          tips="一个引人注目的标题可以帮助您吸引观看者。在确定视频标题时，最好加入观众在查找类似视频时可能会使用的关键字。"
        />
        <TitleInput
          title="说明"
          value={videoNameAndDescribe?.description}
          onChange={(e) => {
            setVideoTitleAndDescribe((videoInfo) => ({
              ...videoInfo,
              description: e.target.value,
            }));
          }}
          placeholder="向观看者介绍您的视频"
          tips="在说明中加入适当的关键字，可以帮助观看者通过搜索更轻松地找到您的视频。您可以在说明中大致介绍视频的内容，并将关键字放在说明的开头部分。"
        />
        <Typography.Title level={5}>缩略图</Typography.Title>
        <Typography.Text type="secondary" style={{fontSize: 14}}>
          选择或上传一张可展示您视频内容的图片。好的缩略图能脱颖而出，吸引观看者的眼球。
        </Typography.Text>
        <UploadAndPreview>
          {isUndefined(image) ? (
            <UploadImageWrapper>
              <StyledUploadImag icon={<UploadImagIcon />} type="dashed" />
              <UploadInput
                type="file"
                onChange={(e) => {
                  const file = e?.target?.files?.[0];
                  if (file?.type !== 'image/png') {
                    notification.error({
                      message: '类型错误',
                      description: '目前只支持png格式的图片哦.',
                    });
                  } else {
                    const formData = new FormData();
                    formData.append('file', file);
                    uploadImage(formData).then((res) => {
                      setImage(res.data?.image);
                    });
                  }
                }}
              />
            </UploadImageWrapper>
          ) : (
            <PreviewContainer>
              <Image
                width={360}
                height={240}
                alt="fallback"
                src={`/api/Image/getImage?path=${image.path}`}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              />
              <DeleteButton>
                <Button
                  type="text"
                  icon={<DeleteOutlined style={{fontSize: 16}} />}
                  onClick={() => {
                    setImage(undefined);
                  }}
                  danger
                >
                  删除
                </Button>
              </DeleteButton>
            </PreviewContainer>
          )}
        </UploadAndPreview>

        <Footer>
          <Button
            type="primary"
            loading={isLoading}
            onClick={async () => {
              await multipartUpload(videoFile);
              await refetchVideos();
            }}
          >
            上传
          </Button>
        </Footer>
      </Card>
      <Card>
        <Typography.Title level={5}>预览</Typography.Title>
        <Video src={url} controls />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--mt-spacing-3x);
`;

const UploadImageWrapper = styled.div`
  position: relative;
  width: 260px;
  height: 140px;
`;

const StyledUploadImag = styled(Button)`
  width: 260px;
  height: 140px;
`;

const UploadImagIcon = styled(FolderAddOutlined)`
  font-size: 42px;
  color: var(--mt-upload-icon-color);
`;

const UploadAndPreview = styled.div`
  margin-top: var(--mt-spacing-1x);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--mt-spacing-1x);
  max-width: 530px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Footer = styled.div`
  display: grid;
  grid-template-columns: 64px;
  justify-content: end;
`;

const Video = styled.video`
  max-width: 500px;
`;
