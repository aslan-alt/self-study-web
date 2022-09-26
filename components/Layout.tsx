import React, {FC} from 'react';
import styled from 'styled-components';
import {Header} from '@/components/Header';

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  headerContent?: React.ReactNode;
};
export const Layout: FC<Props> = ({
  leftContent,
  rightContent,
  headerContent = <Header />,
  ...reset
}) => {
  return (
    <div {...reset}>
      {headerContent}
      <Body>
        <div>{leftContent}</div>
        <Right>{rightContent}</Right>
      </Body>
    </div>
  );
};

const Body = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
`;

const Right = styled.div`
  background: #f9f9f9;
`;
