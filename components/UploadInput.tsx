import React, {FC, InputHTMLAttributes} from 'react';
import styled from 'styled-components';

export const UploadInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <StyledUploadInput type="file" {...props} />;
};

const StyledUploadInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  left: 0;
  cursor: pointer;
`;
