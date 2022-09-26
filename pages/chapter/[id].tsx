import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Chapters} from '@/components/Chapters';
import {Layout} from '@/components/Layout';
import {Courses} from '../api/v1/getCourseCatalog';

type Props = {
  courses?: Courses;
};

const ChapterItem: NextPage<Props> = ({courses}) => {
  const router = useRouter();

  return (
    <Layout
      data-tn="home-container"
      leftContent={<Chapters courses={courses} />}
      rightContent={
        <Right>
          <div>
            <div>【天才职业44】底层黑社会真实往事：为了兄弟义气，我把自己的老婆……</div>
            <video src="/api/v1/getVideo" width="100%" controls />
          </div>
          <div>
            <div>互联网介绍（43/43）</div>
          </div>
        </Right>
      }
    />
  );
};

export default ChapterItem;

const Right = styled.div`
  padding: var(--cx-spacing-2x);
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/v1/getCourseCatalog');
  const {courses} = await res.json();

  return {
    props: {courses},
  };
};
