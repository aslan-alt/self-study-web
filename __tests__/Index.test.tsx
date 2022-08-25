import {render, screen} from '@testing-library/react';
import Home from '../pages';

describe('<Home />', () => {
  it('should render Home', () => {
    render(<Home />);

    expect(screen.getByTestId('home-container')).toBeInTheDocument();
  });
});
