import React, {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {IconButton} from './IconButton';

export const Header: FC = () => {
  return (
    <Container data-tn="header-container">
      <div>广告位</div>
      <SearchWrapper>
        <SearchInput type="text" placeholder="输入课程名称" />
        <SearchButton>
          <IconButton data-tn="header-icon-search" iconName="search" size={20} />
        </SearchButton>
      </SearchWrapper>
      <Right>
        <SignInButton>
          <Image data-tn="header-icon-user" src="/user.svg" width={24} height={24} alt="userIcon" />
          登录
        </SignInButton>
      </Right>
    </Container>
  );
};

const SearchWrapper = styled.div`
  border-radius: var(--cx-spacing-1x);
  display: flex;
  padding: 4px;
  :hover {
    background: #fff;
  }
`;
const SearchInput = styled.input`
  flex: 1;
  outline: none;
  background: transparent;
  padding-left: var(--cx-spacing-1x);
  border: 1px solid var(--ytd-searchbox-legacy-border-color);
  box-shadow: inset 0 1px 2px var(--ytd-searchbox-legacy-border-shadow-color);
`;

const SearchButton = styled.button`
  width: 62px;
  height: 40px;
  background: transparent;
  border: 1px solid var(--ytd-searchbox-legacy-button-border-color);
  img {
    fill: green;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: var(--cx-spacing-2x);
  padding: 0 var(--cx-spacing-3x);
  align-items: center;
  min-height: 56px;
`;

const Right = styled.div`
  display: grid;
  justify-content: end;
`;

const SignInButton = styled.div`
  display: flex;
  align-items: center;
  color: #065fd4;
  height: 34px;
  border: 1px solid var(--ytd-searchbox-legacy-button-border-color);
  min-width: 90px;
  padding: 0 14px;
  justify-content: space-between;
  border-radius: var(--cx-spacing-3x);
  font-size: var(--cx-spacing-2x);
  cursor: pointer;
  :hover {
    background: #def1ff;
  }
`;
