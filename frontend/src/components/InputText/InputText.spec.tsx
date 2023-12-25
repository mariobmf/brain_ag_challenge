import { render, screen } from '@testing-library/react';
import { InputText } from '@/components/InputText';

describe('<InputText />', () => {
  it('should render default correctly', () => {
    render(<InputText />);
    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
  });
  it('should render the input with the label', () => {
    const mockLabel = 'Input Label';
    render(<InputText label={mockLabel} />);
    const label = screen.queryByText(mockLabel);
    expect(label).toBeVisible();
  });
  it('should render an error message', async () => {
    const mockLabel = 'Input Label';
    const mockErrorMessage = 'Input Error';
    render(
      <InputText label={mockLabel} error={{ message: mockErrorMessage }} />,
    );
    expect(screen.getByTestId('input-text-error')).toBeVisible();
    expect(screen.getByText(mockErrorMessage)).toBeVisible();
  });
});
