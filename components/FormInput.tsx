import React, {FC, InputHTMLAttributes} from 'react';
import styled from 'styled-components';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const FieldInput: FC<Props> = (props) => {
  return <Input {...props} />;
};

const Input = styled.input`
  height: 48px;
  width: 300px;
  margin-top: 40px;
  background: transparent;
  border-radius: 10px;
  border: 1px solid rgba(11, 12, 16);
  color: black;
  padding-left: var(--mt-spacing-1x);
`;
