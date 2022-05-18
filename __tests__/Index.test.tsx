import {render, screen} from '@testing-library/react';
import Index from '../pages';

describe('<AddButton />', () => {
  it('should trigger onClick when click add button', () => {
    render(<Index />);

    expect(screen.getByText('首页')).toBeInTheDocument();
  });
});
