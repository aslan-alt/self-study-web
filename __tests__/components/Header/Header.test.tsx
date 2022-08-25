import {render, screen} from '@testing-library/react';
import {Header} from '@/components/Header';

describe('<Header />', () => {
  it('should render Header and searchInput', () => {
    render(<Header />);
    expect(screen.getByText('广告位')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('输入课程名称')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon-search')).toBeInTheDocument();

    expect(screen.getByText('登录')).toBeInTheDocument();
    expect(screen.getByTestId('header-icon-user')).toBeInTheDocument();
  });
});
