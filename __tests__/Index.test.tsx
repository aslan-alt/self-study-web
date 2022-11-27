import React from 'react';
import {render, screen} from '@testing-library/react';
import {useRouter} from 'next/router';
import {TestWrapper} from '@/lib/testHelper';
import Home from '../pages';

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('<Layout />', () => {
  it('should render Home', () => {
    (useRouter as jest.Mock).mockReturnValue({query: {}});
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    expect(screen.getByTestId('header-container')).toBeInTheDocument();
  });
});
