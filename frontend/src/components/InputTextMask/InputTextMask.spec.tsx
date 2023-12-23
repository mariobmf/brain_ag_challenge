import { render, screen } from '@testing-library/react';
import { InputTextMask } from '@/components/InputTextMask';
import userEvent from '@testing-library/user-event';

describe('<InputTextMask />', () => {
  it('should render default correctly', () => {
    render(<InputTextMask mask="cpf" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
  });
  it('should render the input with the label text in the placeholder', () => {
    const mockLabel = 'Input Label';
    render(<InputTextMask mask="cpf" label={mockLabel} />);
    const input = screen.getByPlaceholderText(mockLabel);
    expect(input).toBeVisible();
    expect(screen.queryByTestId('input-text-label')).toBeNull();
  });
  it('should render the label outside the input when it has focus', async () => {
    const mockLabel = 'Input Label';
    render(<InputTextMask mask="cpf" label={mockLabel} />);
    const input = screen.getByRole('textbox');

    await userEvent.click(input);
    expect(screen.getByTestId('input-text-label')).toBeVisible();
  });
  it('should render the label outside the input when it is filled', async () => {
    const mockLabel = 'Input Label';
    render(<InputTextMask mask="cpf" label={mockLabel} filled />);
    expect(screen.getByTestId('input-text-label')).toBeVisible();
  });
  it('should render default style on blur', async () => {
    const mockLabel = 'Input Label';
    render(<InputTextMask mask="cpf" label={mockLabel} onBlur={() => {}} />);
    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();
    expect(screen.queryByTestId('input-text-label')).not.toBeInTheDocument();
  });
  it('should render an error message', async () => {
    const mockLabel = 'Input Label';
    const mockErrorMessage = 'Input Error';
    render(
      <InputTextMask
        mask="cpf"
        label={mockLabel}
        error={{ message: mockErrorMessage }}
      />,
    );
    expect(screen.getByTestId('input-text-error')).toBeVisible();
    expect(screen.getByText(mockErrorMessage)).toBeVisible();
  });
  it('should render the value with the cpf mask', async () => {
    const mockLabel = 'Input Label';
    render(<InputTextMask mask="cpf" label={mockLabel} onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '12345678900');
    expect(input).toHaveValue('123.456.789-00');
  });
  it('should render the value with the phone mask', async () => {
    const mockLabel = 'Input Label';
    render(<InputTextMask mask="cell_phone" label={mockLabel} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '00000000000');
    expect(input).toHaveValue('(00) 0 0000-0000');
  });
});
