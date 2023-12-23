import { render, screen } from '@testing-library/react';
import { Spinner } from '@/components/Spinner';

describe('<Spinner />', () => {
  it('should render default correctly', () => {
    render(<Spinner />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeVisible();
  });
});
