import React from 'react';
import {Card, Input} from 'antd';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {GetServerSideProps, NextPage} from 'next';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {Chapters} from '@/components/Chapters';
import {Layout} from '@/components/Layout';
import {UploadInput} from '@/components/UploadInput';

type Props = {
  courses?: Course[];
};

const Home: NextPage<Props> = ({courses}) => {
  return (
    <Layout data-tn="home-container">
      {isEmpty(courses) ? (
        <EmptyBody>
          <div></div>
          <Card>
            <InputItem>
              <h4>课程名称</h4>
              <Input maxLength={10} />
            </InputItem>
            <InputItem>
              <h4>描述</h4>
              <Input.TextArea
                showCount
                maxLength={100}
                style={{height: 120}}
                onChange={() => {}}
                placeholder="disable resize"
              />
            </InputItem>
            <div>
              <h4>上传视频</h4>
              <div>
                <UploadInput />
              </div>
            </div>
          </Card>
          <div></div>
        </EmptyBody>
      ) : (
        <Body>
          <Right>
            <Chapters courses={courses} />
          </Right>
          <div>zuoceleixirng</div>
        </Body>
      )}
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get<{courses?: Course[]}>(
    'http://localhost:3000/api/Course/getAllCourses'
  );
  return {
    props: {courses: res.data?.courses ?? []},
  };
};

const InputItem = styled.div`
  display: grid;
  align-items: center;
  margin-bottom: var(--mt-spacing-2x);
  textarea {
    resize: none;
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
`;

const Right = styled.div`
  background: #f9f9f9;
`;

const EmptyBody = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 0 var(--mt-spacing-3x);
`;
