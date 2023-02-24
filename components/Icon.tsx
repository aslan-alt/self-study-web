import React, {FC} from 'react';
import styled from 'styled-components';

type Props = {
  size?: number;
  color?: string;
  name: string;
  onClick?: () => void;
  $cursor?: boolean;
};
export const Icon: FC<Props> = (props) => {
  return (
    <Svg className="icon" aria-hidden="true" {...props}>
      <use xlinkHref={`#icon-${props.name}`}></use>
    </Svg>
  );
};

const Svg = styled.svg<Props>`
  ${(props) => {
    return `${props.size ? `width: ${props.size}em;height: ${props.size}em` : ''}`;
  }};
  ${(props) => {
    return `${props.size ? `color: ${props.color};` : ''}`;
  }};
  ${(props) => {
    return `${props.$cursor ? 'cursor: pointer;' : ''}`;
  }};
`;
