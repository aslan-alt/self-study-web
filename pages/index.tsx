import React from 'react';
import {GetServerSideProps, NextPage} from 'next';

type Props = {
  userInfo?: {};
};

const Home: NextPage<Props> = () => {
  return <div data-tn="home">首页 xiong123</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      userInfo: {},
    },
  };
};
