import {render, screen} from '@testing-library/react';
import Home from '../pages';

describe('<AddButton />', () => {
  it('should trigger onClick when click add button', () => {
    render(<Home />);

    expect(screen.getByText('首页')).toBeInTheDocument();
  });
});
