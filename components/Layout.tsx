import React, {FC, useState} from 'react';
import {Layout as AntdLayout, Menu, Breadcrumb, Card, Typography, Button, Input, Modal} from 'antd';
import {isEmpty} from 'lodash';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Course, User} from '@/DB/entity';
import {Header} from '@/components/Header';
import {VideoForm} from '@/components/VideoForm';
import {useCreateCourse} from '../hooks/useCreateCourse';
import {useGetVideos} from '../hooks/useGetVideos';
import {CourseType} from '../requests';

const {Sider} = AntdLayout;

const leftWidth = 240;

export const Layout: FC<{courses?: Course[]; user?: User}> = ({courses}) => {
  const router = useRouter();
  const selectedId = String(router.query.id ?? 1);

  const course = courses.find((item) => String(item.id) === selectedId);

  const [chapterName, setChapterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {mutateAsync: createCourse, isLoading} = useCreateCourse();

  const {data: videos} = useGetVideos(selectedId);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const {data} = await createCourse({title: chapterName, type: CourseType.FE, author: 1});
    closeModal();
    await router.push(`/chapter/${data.id}`);
    setChapterName('');
  };

  return (
    <Container>
      <Header openModal={openModal} />
      <Polyfill />

      <AntdLayout>
        <Left width={leftWidth} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[selectedId]}
            style={{height: '100%', borderRight: 0}}
            items={courses?.map((chapter) => {
              return {
                key: chapter.id,
                label: <Link href={`/chapter/${chapter.id}`}>{chapter.title}</Link>,
              };
            })}
          />
        </Left>
        <Content style={{padding: '0 24px 24px'}}>
          {course ? (
            <>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{course?.title ?? ''}</Breadcrumb.Item>
              </Breadcrumb>
              {isEmpty(videos) ? <VideoForm course={course} /> : <Card>我是内容</Card>}
            </>
          ) : (
            <EmptyTips>
              <Typography.Text>
                还没有任何内容哦, 立马去
                <Button type="link" style={{padding: 0, fontSize: 'inherit'}} onClick={openModal}>
                  创建
                </Button>
                吧
              </Typography.Text>
            </EmptyTips>
          )}
        </Content>
      </AntdLayout>
      <Modal
        title="添加章节"
        open={isModalOpen}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={isLoading} onClick={handleOk}>
            创建
          </Button>,
        ]}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Input
          placeholder="请输入章节名"
          value={chapterName}
          onChange={(e) => {
            setChapterName(e.target.value);
          }}
        />
      </Modal>
    </Container>
  );
};

const Left = styled(Sider)`
  overflow-y: scroll;
  overflow-x: hidden;
  background: var(--mt-theme-background-color);
`;

const Container = styled(AntdLayout)`
  height: 100vh;
  overflow: hidden;
  background: var(--mt-theme-background-color);
`;

const Content = styled(AntdLayout)`
  background: var(--mt-theme-background-color);
`;

const Polyfill = styled.div`
  height: 70px;
`;

const EmptyTips = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
