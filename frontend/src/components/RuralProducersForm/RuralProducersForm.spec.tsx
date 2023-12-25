import { logRoles, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RuralProducerForm } from '.';
import { cpfMask } from '@/utils/maskFormatter';
import { RuralProducer } from '@/interfaces/RuralProducer';

describe('<RuralProducerForm />', () => {
  const mockSubmitForm = jest.fn();
  it('should render in registration mode correctly', () => {
    render(<RuralProducerForm type="create" onSubmit={mockSubmitForm} />);
    const inputDocumento = screen.getByRole('textbox', { name: 'Documento' });
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputFarm = screen.getByRole('textbox', { name: 'Fazenda' });
    const inputCity = screen.getByRole('textbox', { name: 'Cidade' });
    const inputState = screen.getByRole('combobox', { name: 'Estado' });
    const inputTotalArea = screen.getByRole('spinbutton', {
      name: 'Area da fazenda',
    });
    const inputCultivableArea = screen.getByRole('spinbutton', {
      name: 'Area agricultável',
    });
    const inputVegetationArea = screen.getByRole('spinbutton', {
      name: 'Area de vegetação',
    });
    const inputPlantedCrops = screen.getByRole('combobox', {
      name: 'Culturas',
    });
    const registrationButton = screen.getByRole('button', {
      name: /cadastrar/i,
    });
    const editButton = screen.queryByRole('button', { name: /atualizar/i });
    expect(inputDocumento).toBeVisible();
    expect(inputName).toBeVisible();
    expect(inputFarm).toBeVisible();
    expect(inputCity).toBeVisible();
    expect(inputState).toBeVisible();
    expect(inputTotalArea).toBeVisible();
    expect(inputCultivableArea).toBeVisible();
    expect(inputVegetationArea).toBeVisible();
    expect(inputPlantedCrops).toBeVisible();
    expect(registrationButton).not.toBeEnabled();
    expect(editButton).not.toBeInTheDocument();
  });
  it('should render in edit mode correctly', async () => {
    const ruralProducer: RuralProducer = {
      id: '123',
      document: '12345678900',
      name: 'John Doe',
      farmName: 'Farm',
      city: 'São Paulo',
      state: 'SP',
      totalAreaInHectaresOfTheFarm: 10,
      cultivableAreaInHectares: 8,
      vegetationAreaInHectares: 2,
      plantedCrops: ['soy', 'corn'],
    };
    render(
      <RuralProducerForm
        type="update"
        defaultValues={ruralProducer}
        onSubmit={mockSubmitForm}
      />,
    );
    expect(await screen.findByText('Atualizar')).toBeInTheDocument(); // wait for the form to be rendered
    const inputDocumento = screen.getByRole('textbox', { name: 'Documento' });
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputFarm = screen.getByRole('textbox', { name: 'Fazenda' });
    const inputCity = screen.getByRole('textbox', { name: 'Cidade' });
    const inputTotalArea = screen.getByRole('spinbutton', {
      name: 'Area da fazenda',
    });
    const inputCultivableArea = screen.getByRole('spinbutton', {
      name: 'Area agricultável',
    });
    const inputVegetationArea = screen.getByRole('spinbutton', {
      name: 'Area de vegetação',
    });
    const editButton = screen.getByRole('button', { name: /atualizar/i });
    const registrationButton = screen.queryByRole('button', {
      name: /cadastrar/i,
    });
    expect(inputDocumento).toHaveValue(cpfMask(ruralProducer.document));
    expect(inputName).toHaveValue(ruralProducer.name);
    expect(inputFarm).toHaveValue(ruralProducer.farmName);
    expect(inputCity).toHaveValue(ruralProducer.city);
    expect(inputTotalArea).toHaveValue(
      ruralProducer.totalAreaInHectaresOfTheFarm,
    );
    expect(inputCultivableArea).toHaveValue(
      ruralProducer.cultivableAreaInHectares,
    );
    expect(inputVegetationArea).toHaveValue(
      ruralProducer.vegetationAreaInHectares,
    );
    expect(screen.getByRole('form')).toHaveFormValues({
      state: ruralProducer.state,
      plantedCrops: ruralProducer.plantedCrops,
    });
    expect(editButton).toBeVisible();
    expect(editButton).not.toBeEnabled();
    expect(registrationButton).not.toBeInTheDocument();
  });
  it('should render the submit button enabled', async () => {
    render(<RuralProducerForm type="create" onSubmit={mockSubmitForm} />);
    const inputDocumento = screen.getByRole('textbox', { name: 'Documento' });
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputFarm = screen.getByRole('textbox', { name: 'Fazenda' });
    const inputCity = screen.getByRole('textbox', { name: 'Cidade' });
    const inputState = screen.getByRole('combobox', { name: 'Estado' });
    const inputTotalArea = screen.getByRole('spinbutton', {
      name: 'Area da fazenda',
    });
    const inputCultivableArea = screen.getByRole('spinbutton', {
      name: 'Area agricultável',
    });
    const inputVegetationArea = screen.getByRole('spinbutton', {
      name: 'Area de vegetação',
    });
    const inputPlantedCrops = screen.getByRole('combobox', {
      name: 'Culturas',
    });
    const buttonSubmit = screen.getByRole('button');

    await userEvent.type(inputDocumento, '51721482059');
    await userEvent.type(inputName, 'John Doe');
    await userEvent.type(inputFarm, 'Farm');
    await userEvent.type(inputCity, 'Sao Paulo');
    await userEvent.type(inputTotalArea, '10');
    await userEvent.type(inputCultivableArea, '8');
    await userEvent.type(inputVegetationArea, '2');
    await waitFor(async () => {
      inputState.focus();
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.click(screen.getByText('SP'));
      inputPlantedCrops.focus();
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.click(screen.getByText('Soja'));
    });
    await userEvent.click(buttonSubmit);
    expect(buttonSubmit).toBeEnabled();
  });
  it('should submit form data', async () => {
    render(<RuralProducerForm type="create" onSubmit={mockSubmitForm} />);
    const inputDocumento = screen.getByRole('textbox', { name: 'Documento' });
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputFarm = screen.getByRole('textbox', { name: 'Fazenda' });
    const inputCity = screen.getByRole('textbox', { name: 'Cidade' });
    const inputState = screen.getByRole('combobox', { name: 'Estado' });
    const inputTotalArea = screen.getByRole('spinbutton', {
      name: 'Area da fazenda',
    });
    const inputCultivableArea = screen.getByRole('spinbutton', {
      name: 'Area agricultável',
    });
    const inputVegetationArea = screen.getByRole('spinbutton', {
      name: 'Area de vegetação',
    });
    const inputPlantedCrops = screen.getByRole('combobox', {
      name: 'Culturas',
    });
    const buttonSubmit = screen.getByRole('button');

    await userEvent.type(inputDocumento, '51721482059');
    await userEvent.type(inputName, 'John Doe');
    await userEvent.type(inputFarm, 'Farm');
    await userEvent.type(inputCity, 'Sao Paulo');
    await userEvent.type(inputTotalArea, '10');
    await userEvent.type(inputCultivableArea, '8');
    await userEvent.type(inputVegetationArea, '2');
    await waitFor(async () => {
      inputState.focus();
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.click(screen.getByText('SP'));
      inputPlantedCrops.focus();
      await userEvent.keyboard('[ArrowDown]');
      await userEvent.click(screen.getByText('Soja'));
    });
    await userEvent.click(buttonSubmit);
    expect(buttonSubmit).toBeEnabled();

    expect(mockSubmitForm).toHaveBeenCalledWith({
      document: '517.214.820-59',
      name: 'John Doe',
      farmName: 'Farm',
      city: 'Sao Paulo',
      state: 'SP',
      totalAreaInHectaresOfTheFarm: 10,
      cultivableAreaInHectares: 8,
      vegetationAreaInHectares: 2,
      plantedCrops: ['soy'],
    });
  });
});
