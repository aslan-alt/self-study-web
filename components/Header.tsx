import React, {FC} from 'react';
import {AudioOutlined} from '@ant-design/icons';
import {Input} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
const {Search} = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
export const Header: FC = () => {
  return (
    <Container data-tn="header-container">
      <div
        onClick={() => {
          fetch('http://localhost:3000/api/user/registerUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: 'aslan-test1234',
              password: '123456122',
              passwordConfirmation: '123456122',
            }),
          });
        }}
      >
        我的科技树
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
        suffix={suffix}
        onSearch={() => {}}
      />
      <Right>
        <Link href={`/signIn`}>
          <SignInButton>
            <Image
              data-tn="header-icon-user"
              src="/user.svg"
              width={24}
              height={24}
              alt="userIcon"
            />
            登录
          </SignInButton>
        </Link>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: var(--cx-spacing-2x);
  padding: 0 var(--cx-spacing-3x);
  align-items: center;
  min-height: 56px;
`;

const Right = styled.div`
  display: grid;
  justify-content: end;
`;

const SignInButton = styled.div`
  display: flex;
  align-items: center;
  color: #065fd4;
  height: 34px;
  border: 1px solid var(--ytd-searchbox-legacy-button-border-color);
  min-width: 90px;
  padding: 0 14px;
  justify-content: space-between;
  border-radius: var(--cx-spacing-3x);
  font-size: var(--cx-spacing-2x);
  cursor: pointer;
  :hover {
    background: #def1ff;
  }
`;
