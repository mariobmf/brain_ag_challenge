import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RuralProducerForm } from '.';
import { cpfMask, phoneNumberMask } from '@/utils/maskFormatter';

describe('<RuralProducerForm />', () => {
  const mockSubmitForm = jest.fn();
  it('should render in registration mode correctly', () => {
    render(<RuralProducerForm type="create" onSubmit={mockSubmitForm} />);
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'Email' });
    const inputCpf = screen.getByRole('textbox', { name: 'CPF' });
    const inputPhone = screen.getByRole('textbox', { name: 'Telefone' });
    const registrationButton = screen.getByRole('button', {
      name: /cadastrar/i,
    });
    const editButton = screen.queryByRole('button', { name: /atualizar/i });
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeVisible();
    expect(inputCpf).toBeVisible();
    expect(inputPhone).toBeVisible();
    expect(registrationButton).toBeVisible();
    expect(registrationButton).not.toBeEnabled();
    expect(editButton).not.toBeInTheDocument();
  });
  it('should render in edit mode correctly', async () => {
    const user = {
      id: '1',
      name: 'Luiz Souza',
      cpf: '32420496329',
      phone: '1144446666',
      email: 'luiz@luizsouza.com.br',
    };
    render(
      <RuralProducerForm
        type="update"
        defaultValues={user}
        onSubmit={mockSubmitForm}
      />,
    );
    expect(await screen.findByText('Atualizar')).toBeInTheDocument(); // wait for the form to be rendered
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'Email' });
    const inputCpf = screen.getByRole('textbox', { name: 'CPF' });
    const inputPhone = screen.getByRole('textbox', { name: 'Telefone' });
    const editButton = screen.getByRole('button', { name: /atualizar/i });
    const registrationButton = screen.queryByRole('button', {
      name: /cadastrar/i,
    });
    expect(inputName).toBeVisible();
    expect(inputEmail).toBeVisible();
    expect(inputCpf).toBeVisible();
    expect(inputPhone).toBeVisible();
    expect(inputName).toHaveValue(user.name);
    expect(inputEmail).toHaveValue(user.email);
    expect(inputCpf).toHaveValue(cpfMask(user.cpf));
    expect(inputPhone).toHaveValue(phoneNumberMask(user.phone));
    expect(editButton).toBeVisible();
    expect(editButton).not.toBeEnabled();
    expect(registrationButton).not.toBeInTheDocument();
  });
  it('should render the submit button enabled', async () => {
    render(<RuralProducerForm type="create" onSubmit={mockSubmitForm} />);
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'Email' });
    const inputCpf = screen.getByRole('textbox', { name: 'CPF' });
    const inputPhone = screen.getByRole('textbox', { name: 'Telefone' });
    const buttonSubmit = screen.getByRole('button');

    await userEvent.type(inputName, 'Luiz Souza');
    await userEvent.type(inputEmail, 'luiz@luizsouza.com.br');
    await userEvent.type(inputCpf, '32420496329');
    await userEvent.type(inputPhone, '11944446666');
    await userEvent.click(buttonSubmit);

    expect(buttonSubmit).toBeEnabled();
  });
  it('should submit form data', async () => {
    render(<RuralProducerForm type="create" onSubmit={mockSubmitForm} />);
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputEmail = screen.getByRole('textbox', { name: 'Email' });
    const inputCpf = screen.getByRole('textbox', { name: 'CPF' });
    const inputPhone = screen.getByRole('textbox', { name: 'Telefone' });
    const buttonSubmit = screen.getByRole('button');

    await userEvent.type(inputName, 'Luiz Souza');
    await userEvent.type(inputEmail, 'luiz@luizsouza.com.br');
    await userEvent.type(inputCpf, '32420496329');
    await userEvent.type(inputPhone, '11944446666');
    await userEvent.click(buttonSubmit);

    expect(mockSubmitForm).toHaveBeenCalledWith({
      name: 'Luiz Souza',
      email: 'luiz@luizsouza.com.br',
      cpf: '324.204.963-29',
      phone: '(11) 9 4444-6666',
    });
  });
});
