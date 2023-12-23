import { render, screen } from '@testing-library/react';
import { InputText } from '@/components/InputText';
import userEvent from '@testing-library/user-event';

describe('<InputText />', () => {
  it('should render default correctly', () => {
    render(<InputText />);
    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
  });
  it('should render the input with the label text in the placeholder', () => {
    const mockLabel = 'Input Label';
    render(<InputText label={mockLabel} />);
    const input = screen.getByPlaceholderText(mockLabel);
    expect(input).toBeVisible();
    expect(screen.queryByTestId('input-text-label')).toBeNull();
  });
  it('should render the label outside the input when it has focus', async () => {
    const mockLabel = 'Input Label';
    render(<InputText label={mockLabel} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    expect(screen.getByTestId('input-text-label')).toBeVisible();
  });
  it('should render the label outside the input when it is filled', async () => {
    const mockLabel = 'Input Label';
    render(<InputText label={mockLabel} filled />);
    expect(screen.getByTestId('input-text-label')).toBeVisible();
  });
  it('should render default style on blur', async () => {
    const mockLabel = 'Input Label';
    render(<InputText label={mockLabel} onBlur={() => {}} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();
    expect(screen.queryByTestId('input-text-label')).not.toBeInTheDocument();
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
