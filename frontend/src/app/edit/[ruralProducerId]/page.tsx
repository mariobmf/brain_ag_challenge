'use client';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';
import { useGetRuralProducer } from '@/hooks/useGetRuralProducer';
import { useUpdateRuralProducer } from '@/hooks/useUpdateRuralProducer';
import {
  RuralProducerForm,
  RuralProducerFormData,
} from '@/components/RuralProducersForm';

interface EditProps {
  params: {
    ruralProducerId: string;
  };
}

export default function Edit({ params: { ruralProducerId } }: EditProps) {
  const router = useRouter();
  const { data: ruralProducer, isLoading: getRuralProducerIsLoading } =
    useGetRuralProducer({ id: ruralProducerId });

  const {
    mutateAsync: handleUpdateRuralProducer,
    isPending: updateRuralProducerIsLoading,
  } = useUpdateRuralProducer();

  const handleFormSubmit = async (formData: RuralProducerFormData) => {
    try {
      await handleUpdateRuralProducer({
        id: ruralProducerId,
        ...formData,
      });
      toast.success('Produtor Rural atualizado com sucesso');
      router.push('/');
    } catch (error) {
      toast.error('Erro ao atualizar usuário');
    }
  };

  if (!ruralProducer && !getRuralProducerIsLoading) {
    return redirect('/ruralProducers');
  }
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-8 p-4">
      {ruralProducer ? (
        <>
          <h1>Atualizar Produtor Rural</h1>
          <RuralProducerForm
            type="update"
            onSubmit={handleFormSubmit}
            isLoading={updateRuralProducerIsLoading}
            defaultValues={ruralProducer}
          />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
