import React, {FC} from 'react';
import {Header} from '@/components/Header';

type Props = {
  children?: React.ReactNode;
};
export const Layout: FC<Props> = ({children, ...reset}) => {
  return (
    <div {...reset}>
      <Header />
      {children}
    </div>
  );
};
