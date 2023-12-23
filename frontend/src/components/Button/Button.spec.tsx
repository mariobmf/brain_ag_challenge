import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('<Button />', () => {
  it('should render default correctly', () => {
    render(<Button label="Button" />);
    const button = screen.getByRole('button');
    expect(button).toBeVisible();
  });
  it('should render the button loading', () => {
    render(<Button label="Button" isLoading />);
    const buttonByText = screen.queryByText('Button');
    const spinner = screen.getByTestId('spinner');
    expect(buttonByText).not.toBeInTheDocument();
    expect(spinner).toBeVisible();
  });
});
