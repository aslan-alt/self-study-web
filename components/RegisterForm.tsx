import React, {FC} from 'react';
import styled from 'styled-components';
import {FieldInput} from '@/components/FormInput';
import {ActionType} from './Header';

type Props = {
  updateActionType: (v: ActionType) => void;
  closeModal: () => void;
};
// TODO: Refactor LoginForm and RegisterForm

export const RegisterForm: FC<Props> = ({updateActionType}) => {
  return (
    <Container>
      <FieldInput name="username" placeholder="User Name" />
      <FieldInput name="password" placeholder="Password" type="password" />
      <FieldInput name="password" placeholder="Password" type="password" />
      <Button>{'Register'}</Button>

      <Tips>
        Already have an account?{' '}
        <ToggleButton
          onClick={() => {
            updateActionType('Login');
          }}
        >
          Login
        </ToggleButton>
      </Tips>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--mt-chat-m-font-size);
`;

const Tips = styled.p`
  margin-top: 14px;
`;

const Button = styled.button<{isLoading?: boolean}>`
  margin-top: 40px;
  width: 300px;
  height: 48px;
  background: var(--mt-background-black-color);
  color: var(--mt-theme-background-color);
  ${(props) => (props.isLoading ? 'background: rgba(11, 12, 16,0.3);border:none;' : '')}
  border: 1px solid var(--mt-background-black-color);
  font-size: var(--mt-chat-l-font-size);
  font-weight: var(--mt-font-weight-large);
  cursor: pointer;
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: rgba(23, 90, 226);
  cursor: pointer;
`;
