import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const Lessons = () => {
  const mockData = [
    {
      id: 1,
      text: '互联网概述',
    },
    {
      id: 2,
      text: 'HTML',
    },
    {
      id: 3,
      text: 'CSS',
    },
  ];
  return (
    <Container>
      {mockData.map((item) => {
        return (
          <Item key={item.id}>
            <Link href={`/lesson/${item.id}`}>
              <a>互联网概述</a>
            </Link>
          </Item>
        );
      })}
    </Container>
  );
};

const Container = styled.ul`
  padding-left: var(--cx-spacing-3x);
`;
const Item = styled.li`
  border: 1px solid red;
  padding: 8px 0;
  //background: #e5e5e5;
`;
