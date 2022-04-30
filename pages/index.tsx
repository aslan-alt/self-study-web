import React from 'react';
import {GetServerSideProps, NextPage} from 'next';

type Props = {
  userInfo: {};
};

const Index: NextPage<Props> = () => {
  return <div>首页</div>;
};
export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      userInfo: {},
    },
  };
};
