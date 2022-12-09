import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Course, User} from '@/DB/entity';
import {Layout} from '@/components/Layout';
import {withSessionSsr} from '@/lib/withSession';
import {getAllCourses} from '../requests/getAllCourses';

type Props = {
  courses?: Course[];
  user?: User;
};

const Home: NextPage<Props> = (props) => {
  return <Layout {...props} />;
};

export default Home;

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({req}) => {
  const user = req.session.user;
  const data = await getAllCourses();
  return {
    props: {courses: data?.courses ?? [], user: user ?? {}},
  };
});
