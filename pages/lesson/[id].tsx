import React, {FC} from 'react';
import {useRouter} from 'next/router';
import {Layout} from '@/components/Layout';

const Lesson: FC = () => {
  const router = useRouter();

  return <Layout data-tn="home-container" rightContent={<div>{router.asPath}</div>} />;
};
export default Lesson;
