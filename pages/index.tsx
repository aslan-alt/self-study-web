import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Course} from '@/DB/entity';
import {Chapters} from '@/components/Chapters';
import {Layout} from '@/components/Layout';

type Props = {
  courses?: Course[];
};

const Home: NextPage<Props> = ({courses}) => {
  return (
    <Layout
      data-tn="home-container"
      leftContent={<Chapters courses={courses} />}
      rightContent={<div>xxxx</div>}
    />
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/Course/getAllCourses');
  const {courses} = await res.json();

  return {
    props: {courses},
  };
};
