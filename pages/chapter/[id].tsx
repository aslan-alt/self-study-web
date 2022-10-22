import React from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {useRouter} from 'next/router';
// import styled from 'styled-components';
import styled from 'styled-components';
import {Course} from '@/DB/entity';
import {Chapters} from '@/components/Chapters';
import {Layout} from '@/components/Layout';

type Props = {
  courses?: Course[];
};

const ChapterItem: NextPage<Props> = ({courses}) => {
  const router = useRouter();
  const x = courses.filter((item) => item.id === Number(router.query.id));
  console.log('x-------');
  console.log(x);
  return (
    <Layout data-tn="home-container">
      <Body>
        <Right>
          <Chapters courses={courses} />
        </Right>
        <div>zuoceleixirng</div>
      </Body>
    </Layout>
  );
};
// <Right>
//   <div>
//     <div>【天才职业44】底层黑社会真实往事：为了兄弟义气，我把自己的老婆……</div>
//     <video src="/api/v1/getVideo" width="100%" controls />
//   </div>
//   <div>
//     <div>互联网介绍（43/43）</div>
//   </div>
// </Right>
export default ChapterItem;
const Body = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
`;

const Right = styled.div`
  background: #f9f9f9;
`;
// const Right = styled.div`
//   padding: var(--mt-spacing-2x);
//   display: grid;
//   grid-template-columns: 2fr 1fr;
// `;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/Course/getAllCourses');
  const data = await res.json();

  return {
    props: {courses: data?.courses ?? []},
  };
};
