import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Header} from '@/components/Header';

type Props = {
  userInfo?: {};
};

const Home: NextPage<Props> = () => {
  return (
    <div data-tn="home-container">
      <Header />
    </div>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      userInfo: {},
    },
  };
};
