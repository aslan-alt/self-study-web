import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Course} from '@/DB/entity';
import {Layout} from '@/components/Layout';
import {getAllCourses} from '../requests/getAllCourses';

type Props = {
  courses?: Course[];
};

const Home: NextPage<Props> = ({courses}) => {
  return <Layout courses={courses} />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getAllCourses();
  return {
    props: {courses: res.data?.courses ?? []},
  };
};
