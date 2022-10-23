import React, {FC, useState} from 'react';
import {AudioOutlined} from '@ant-design/icons';
import {PlusOutlined, LoginOutlined} from '@ant-design/icons';
import {Button, Input, Layout, Modal} from 'antd';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {useCreateCourse} from '../hooks/useCreateCourse';
import {CourseType} from '../requests';
const {Search} = Input;

export const Header: FC = () => {
  const router = useRouter();
  const [chapterName, setChapterName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {mutateAsync: createCourse, isLoading} = useCreateCourse();

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
    <Container data-tn="header-container" style={{position: 'fixed', zIndex: 1, width: '100%'}}>
      <div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>
          添加新章节
        </Button>
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
      </div>
      {/*<div*/}
      {/*  onClick={() => {*/}
      {/*    fetch('http://localhost:3000/api/user/signIn', {*/}
      {/*      method: 'POST',*/}
      {/*      headers: {'Content-Type': 'application/json'},*/}
      {/*      body: JSON.stringify({*/}
      {/*        username: 'aslan-test1234',*/}
      {/*        password: '123456122',*/}
      {/*      }),*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  登陆*/}
      {/*</div>*/}
      {/*<div*/}
      {/*  onClick={() => {*/}
      {/*    fetch('http://localhost:3000/api/Course/createCourse', {*/}
      {/*      method: 'POST',*/}
      {/*      headers: {'Content-Type': 'application/json'},*/}
      {/*      body: JSON.stringify({*/}
      {/*        title: '互联网起源',*/}
      {/*        type: CourseType.FE,*/}
      {/*        author: 'aslan-test1234',*/}
      {/*      }),*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  上传Video*/}
      {/*</div>*/}

      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={
          <AudioOutlined
            style={{
              fontSize: 16,
              color: '#1890ff',
            }}
          />
        }
        onSearch={() => {}}
      />
      <Right>
        <SignInButton type="primary" icon={<LoginOutlined />}>
          登录
        </SignInButton>
      </Right>
    </Container>
  );
};

const Container = styled(Layout.Header)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: var(--mt-spacing-2x);
  padding: 0 var(--mt-spacing-3x);
  align-items: center;
  background: var(--mt-theme-background-color);
  box-shadow: 0 2px 4px 0 var(--mt-color-shadow);
`;

const Right = styled.div`
  display: grid;
  justify-content: end;
`;

const SignInButton = styled(Button)`
  border-radius: var(--mt-spacing-3x);
`;
