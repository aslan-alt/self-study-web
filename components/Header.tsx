import React, {FC, useState} from 'react';
import {AudioOutlined} from '@ant-design/icons';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Input, Layout, Modal} from 'antd';
import styled from 'styled-components';
import {Icon} from '@/components/Icon';
import {Log} from '@/components/Log';
import {LoginForm} from '@/components/LoginForm';
import {RegisterForm} from '@/components/RegisterForm';
import {LOG_URL_WHITE} from '@/constants/index';

const {Search} = Input;

type Props = {
  openModal: () => void;
  isLogin: boolean;
};

export type ActionType = 'Register' | 'Login';

export const Header: FC<Props> = ({openModal, isLogin}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>('Login');

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateActionType = (action: ActionType) => {
    setActionType(action);
  };
  return (
    <Container data-tn="header-container" style={{position: 'fixed', zIndex: 1, width: '100%'}}>
      <div>
        {isLogin && (
          <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>
            添加新章节
          </Button>
        )}
      </div>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={
          <AudioOutlined
            style={{
              fontSize: 16,
              color: '#1890ff',
            }}
          />
        }
        onSearch={() => {}}
      />
      <Right>
        {isLogin ? (
          <SignInButton>注销</SignInButton>
        ) : (
          <SignInButton
            type="primary"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            登录 ｜ 注册
          </SignInButton>
        )}
      </Right>

      {isOpen && (
        <StyledModal
          actionType={actionType}
          open={isOpen}
          onOk={closeModal}
          onCancel={closeModal}
          footer={[]}
        >
          <ModalHeader>
            <Log url={LOG_URL_WHITE} />
            <CloseButton onClick={closeModal}>
              <Icon name="close" size={1.5} />
            </CloseButton>
          </ModalHeader>
          {actionType === 'Login' ? (
            <LoginForm updateActionType={updateActionType} closeModal={closeModal} />
          ) : (
            <RegisterForm updateActionType={updateActionType} closeModal={closeModal} />
          )}
        </StyledModal>
      )}
    </Container>
  );
};

const Container = styled(Layout.Header)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: var(--mt-spacing-2x);
  padding: 0 var(--mt-spacing-3x);
  align-items: center;
  background: var(--mt-theme-background-color);
  box-shadow: 0 2px 4px 0 var(--mt-color-shadow);
`;

const Right = styled.div`
  display: grid;
  justify-content: end;
`;

const SignInButton = styled(Button)`
  border-radius: var(--mt-spacing-3x);
`;

const StyledModal = styled(Modal)<{actionType: ActionType}>`
  .ant-modal-content {
    padding: 0;
    ${({actionType}) =>
      actionType === 'Login' ? 'width: 500px;height: 500px;' : 'width: 500px;height: 540px;'}
  }
`;

const ModalHeader = styled.div`
  background: rgba(11, 12, 16);
  height: 68px;
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
`;

const CloseButton = styled.label`
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 10px;
  right: 0;
  top: 0;
  cursor: pointer;
`;
