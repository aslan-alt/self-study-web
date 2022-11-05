import React, {FC} from 'react';
import {AudioOutlined} from '@ant-design/icons';
import {PlusOutlined, LoginOutlined} from '@ant-design/icons';
import {Button, Input, Layout} from 'antd';
import styled from 'styled-components';
import {login} from '../requests/login';
import {registerUser} from '../requests/registerUser';
const {Search} = Input;

type Props = {
  openModal: () => void;
};

export const Header: FC<Props> = ({openModal}) => {
  return (
    <Container data-tn="header-container" style={{position: 'fixed', zIndex: 1, width: '100%'}}>
      <div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>
          添加新章节
        </Button>
      </div>
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
        <SignInButton
          type="primary"
          icon={<LoginOutlined />}
          onClick={() => {
            login({
              username: 'aslan-test1234',
              password: '123456122',
            });
          }}
        >
          登录
        </SignInButton>
        <SignInButton type="primary" icon={<LoginOutlined />} onClick={registerUser}>
          注册
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
