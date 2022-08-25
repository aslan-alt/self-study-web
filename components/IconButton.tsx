import React, {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

export const IconButton: FC<{iconName: string; children?: React.ReactNode; size?: number}> = ({
  iconName,
  size = 20,
  children,
  ...reset
}) => {
  return (
    <Button>
      <div {...reset}>
        <Image src={`/${iconName}.svg`} width={size} height={size} alt={iconName} />
      </div>
      {children}
    </Button>
  );
};

const Button = styled.label`
  display: grid;
  justify-items: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  @keyframes jump {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  :hover {
    div {
      animation: jump 0.3s;
    }
  }
`;
