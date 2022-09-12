import {render, screen} from '@testing-library/react';
import {IconButton} from '@/components/IconButton';

describe('<IconButton />', () => {
  it('should render icon and children', () => {
    render(
      <IconButton data-tn="user-icon" iconName="user">
        用户
      </IconButton>
    );

    expect(screen.getByText('用户')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });
});
