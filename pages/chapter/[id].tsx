import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Course} from '@/DB/entity';
import {Layout} from '@/components/Layout';

type Props = {
  courses?: Course[];
};

const ChapterItem: NextPage<Props> = ({courses}) => {
  return <Layout data-tn="home-container" courses={courses} />;
};

export default ChapterItem;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/Course/getAllCourses');
  const data = await res.json();
  return {
    props: {courses: data?.courses ?? []},
  };
};
