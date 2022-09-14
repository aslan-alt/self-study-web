import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Layout} from '@/components/Layout';

type Props = {
  userInfo?: {};
};

const Home: NextPage<Props> = () => {
  return <Layout data-tn="home-container" rightContent={'test'} />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      userInfo: {},
    },
  };
};
