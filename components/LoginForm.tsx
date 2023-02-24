import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {FieldInput} from '@/components/FormInput';
import {ActionType} from './Header';

type Props = {
  updateActionType: (v: ActionType) => void;
  closeModal: () => void;
};
// TODO: Refactor LoginForm and RegisterForm

export const LoginForm: FC<Props> = ({updateActionType}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const updateForm = (e: any) => {
    setLoginForm((state) => ({...state, ...{[e.name]: e.value}}));
  };

  const onLogin = async () => {
    setIsLoading(true);
    // try {
    //   const res = await axios.post(loginUrl, {...loginForm});
    //   toast(res.data.status ? 'Login successful' : res.data.msg, {
    //     type: res.data.status ? 'success' : 'error',
    //   });
    //   if (res.data.status) {
    //     localStorage.setItem('chat-user', JSON.stringify(res.data.user));
    //     setCurrentUser?.(res.data.user);
    //     closeModal();
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    setIsLoading(false);
  };

  const x = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <Container>
      <FieldInput name="username" value={loginForm.username} placeholder="User Name" onInput={x} />
      <FieldInput
        name="password"
        value={loginForm.password}
        placeholder="Password"
        type="password"
        onInput={(e) => {
          updateForm(e.target);
        }}
      />

      <Button onClick={onLogin} disabled={isLoading} isLoading={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

      <Tips>
        Not a member yet?{' '}
        <ToggleButton
          onClick={() => {
            console.log('zzzzcxcxzcxz');
            updateActionType('Register');
          }}
        >
          Create a New Account
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

const Button = styled.button<{isLoading: boolean}>`
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
