import React from 'react';
import {render, screen} from '@testing-library/react';
import {Header} from '@/components/Header';
import '@testing-library/jest-dom';

describe('<Header />', () => {
  it('should render Header and searchInput', () => {
    render(<Header openModal={jest.fn()} isLogin={false} />);
    expect(screen.getByText('登录 ｜注册')).toBeInTheDocument();
  });
});
