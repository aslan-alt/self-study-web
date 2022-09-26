import {render, screen} from '@testing-library/react';
import {Header} from '@/components/Header';

describe('<Header />', () => {
  it('should render Header and searchInput', () => {
    render(<Header />);
    expect(screen.getByText('我的科技树')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon-search')).toBeInTheDocument();

    expect(screen.getByText('登录')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon-user')).toBeInTheDocument();
  });
});
