import { render, screen, waitFor } from '@testing-library/react';
import { InputSelect } from '@/components/InputSelect';
import userEvent from '@testing-library/user-event';

describe('<InputSelect />', () => {
  const mockOptions = [
    {
      value: '1',
      label: 'Option1',
    },
    {
      value: '2',
      label: 'Option2',
    },
  ];

  it('should render default correctly', () => {
    render(<InputSelect options={mockOptions} />);
    const input = screen.getByTestId('input-select');
    expect(input).toBeVisible();
  });
  it('should render input with label', () => {
    const mockLabel = 'Teste';
    render(<InputSelect options={mockOptions} label={mockLabel} />);
    const label = screen.queryByText(mockLabel);
    expect(label).toBeVisible();
  });
  it('should render an error message', async () => {
    const mockErrorMessage = 'Input Error';
    render(
      <InputSelect
        options={mockOptions}
        error={{ message: mockErrorMessage }}
      />,
    );
    expect(screen.getByTestId('input-text-error')).toBeVisible();
    expect(screen.getByText(mockErrorMessage)).toBeVisible();
  });
  // it('should select one option', async () => {
  //   render(
  //     <form aria-label={'form'}>
  //       <InputSelect options={mockOptions} name="field" />
  //     </form>,
  //   );
  //   const input = screen.getByRole('combobox');
  //   await waitFor(async () => {
  //     input.focus();
  //     screen.debug(input);
  //     await userEvent.keyboard('[ArrowDown]');
  //     await userEvent.click(screen.getByText('Option1'));
  //   });
  //   expect(screen.getByRole('form')).toHaveFormValues({
  //     field: mockOptions[0].value,
  //   });
  // });
});
