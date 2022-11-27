import {render, screen} from '@testing-library/react';
import {Layout} from '@/components/Layout';

describe('<Layout />', () => {
  it('should render Home', () => {
    render(<Layout />);

    expect(screen.getByTestId('home-container')).toBeInTheDocument();
  });
});
