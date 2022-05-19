import React from 'react';
import {GetServerSideProps, NextPage} from 'next';

type Props = {
  userInfo?: {};
};

const Home: NextPage<Props> = () => {
  return <div>首页x</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      userInfo: {},
    },
  };
};
