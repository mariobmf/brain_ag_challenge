'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from '@/components/InputText';
import { InputTextMask } from '@/components/InputTextMask';
import { Button } from '@/components/Button';
import { cpfCnpjMask } from '@/utils/maskFormatter';
import { InputSelect } from '../InputSelect';
import { STATES_LIST } from '@/utils/states';
import { validateCpf } from '@/utils/cpfValidator';
import { validateCnpj } from '@/utils/cnpjValidator';

const schema = z.object({
  document: z
    .string()
    .min(14, 'Documento obrigatório')
    .refine(value => value.length > 14 || validateCpf(value), 'CPF invalido')
    .refine(
      value => value.length <= 14 || validateCnpj(value),
      'CNPJ invalido',
    ),
  name: z.string().min(1, 'Campo obrigatório'),
  farmName: z.string().min(1, 'Campo obrigatório'),
  city: z.string().min(1, 'Campo obrigatório'),
  state: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1, 'Campo obrigatório'),
  totalAreaInHectaresOfTheFarm: z.number().min(1, 'Campo obrigatório'),
  cultivableAreaInHectares: z.number().min(1, 'Campo obrigatório'),
  vegetationAreaInHectares: z.number().min(1, 'Campo obrigatório'),
  plantedCrops: z
    .array(z.enum(['soy', 'corn', 'cotton', 'coffee', 'sugarcane']), {
      required_error: 'Campo obrigatório',
    })
    .min(1, 'Campo obrigatório'),
});

export type RuralProducerFormData = z.infer<typeof schema>;

type FormType = 'create' | 'update';

interface RuralProducerFormProps {
  onSubmit: (data: RuralProducerFormData) => void;
  isLoading?: boolean;
  type: FormType;
  defaultValues?: RuralProducerFormData;
}

const STATES_OPTIONS = STATES_LIST.map(state => ({
  label: state,
  value: state,
}));
const CROPS_OPTIONS = [
  { label: 'Soja', value: 'soy' },
  { label: 'Milho', value: 'corn' },
  { label: 'Algodão', value: 'cotton' },
  { label: 'Café', value: 'coffee' },
  { label: 'Cana de açúcar', value: 'sugarcane' },
];

export function RuralProducerForm({
  onSubmit,
  isLoading = false,
  type,
  defaultValues,
}: RuralProducerFormProps) {
  const defaultValuesFormatted = defaultValues
    ? {
        ...defaultValues,
        document: cpfCnpjMask(defaultValues.document),
      }
    : undefined;

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<RuralProducerFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues:
      (type === 'update' && defaultValuesFormatted) ||
      ({} as RuralProducerFormData),
  });

  const handleFormSubmit: SubmitHandler<
    RuralProducerFormData
  > = async ruralProducerFormData => {
    const sumOfAreas =
      ruralProducerFormData.vegetationAreaInHectares +
      ruralProducerFormData.cultivableAreaInHectares;
    if (sumOfAreas > ruralProducerFormData.totalAreaInHectaresOfTheFarm) {
      setError('totalAreaInHectaresOfTheFarm', {
        message: 'Soma das áreas maior que a área total da fazenda',
      });
      setError('cultivableAreaInHectares', {
        message: 'Soma das áreas maior que a área total da fazenda',
      });
      setError('vegetationAreaInHectares', {
        message: 'Soma das áreas maior que a área total da fazenda',
      });
      return;
    }
    onSubmit(ruralProducerFormData);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <form
        aria-label={'form'}
        id="RuralProducerForm"
        onSubmit={handleSubmit(handleFormSubmit)}
        className="container grid max-w-[900px] auto-rows-fr grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center gap-4 p-4"
      >
        <InputTextMask
          mask="cpf_cnpj"
          label="Documento (CPF/CNPJ)"
          {...register('document')}
          error={errors.document}
          aria-label="Documento"
          disabled={type === 'update'}
        />
        <InputText
          label="Nome do produtor"
          {...register('name')}
          error={errors.name}
          aria-label="Nome"
        />
        <InputText
          label="Nome da fazenda"
          {...register('farmName')}
          error={errors.farmName}
          aria-label="Fazenda"
        />
        <InputText
          label="Cidade"
          {...register('city')}
          error={errors.city}
          aria-label="Cidade"
        />
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <InputSelect
              {...field}
              label="Estado"
              options={STATES_OPTIONS}
              error={errors.state}
              placeholder="Selecione um estado"
              aria-label="Estado"
            />
          )}
        />
        <InputText
          type="number"
          label="Área total da fazenda (em hectares)"
          {...register('totalAreaInHectaresOfTheFarm', {
            setValueAs: value => Number(value),
          })}
          error={errors.totalAreaInHectaresOfTheFarm}
          aria-label="Area da fazenda"
        />
        <InputText
          type="number"
          label="Área agricultável (em hectares)"
          {...register('cultivableAreaInHectares', {
            setValueAs: value => Number(value),
          })}
          error={errors.cultivableAreaInHectares}
          aria-label="Area agricultável"
        />
        <InputText
          type="number"
          label="Área de vegetação (em hectares)"
          {...register('vegetationAreaInHectares', {
            setValueAs: value => Number(value),
          })}
          error={errors.vegetationAreaInHectares}
          aria-label="Area de vegetação"
        />
        <Controller
          control={control}
          name="plantedCrops"
          render={({ field }) => (
            <InputSelect
              {...field}
              label="Culturas plantadas"
              options={CROPS_OPTIONS}
              error={errors.plantedCrops}
              placeholder="Selecione"
              aria-label="Culturas"
              isMulti
            />
          )}
        />
      </form>
      <Button
        label={type === 'create' ? 'Cadastrar' : 'Atualizar'}
        type="submit"
        form="RuralProducerForm"
        isLoading={isLoading}
        className="mt-8 max-w-[350px]"
        disabled={!isDirty || !isValid}
      />
    </div>
  );
}
