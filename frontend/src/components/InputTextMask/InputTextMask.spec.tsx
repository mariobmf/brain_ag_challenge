import { render, screen } from '@testing-library/react';
import { InputTextMask } from '@/components/InputTextMask';
import userEvent from '@testing-library/user-event';

describe('<InputTextMask />', () => {
  it('should render default correctly', () => {
    render(<InputTextMask mask="cpf" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
  });
  it('should render the input with the label', () => {
    const mockLabel = 'Input Label';
    render(<InputTextMask mask="cpf" label={mockLabel} />);
    const label = screen.queryByText(mockLabel);
    expect(label).toBeVisible();
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
