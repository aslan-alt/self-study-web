import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {Course} from '@/DB/entity';
import {Layout} from '@/components/Layout';
import {withSessionSsr} from '@/lib/withSession';
import {getAllCourses} from '../../requests/getAllCourses';

type Props = {
  courses?: Course[];
};

const ChapterItem: NextPage<Props> = (props) => {
  return <Layout data-tn="home-container" {...props} />;
};

export default ChapterItem;

export const getServerSideProps: GetServerSideProps = withSessionSsr(async ({req}) => {
  const user = req.session.user;
  const data = await getAllCourses();
  return {
    props: {courses: data?.courses ?? [], user: user ?? {}},
  };
});
