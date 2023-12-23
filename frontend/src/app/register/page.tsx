'use client';
import {
  RuralProducerForm,
  RuralProducerFormData,
} from '@/components/RuralProducersForm';
import { useCreateRuralProducer } from '@/hooks/useCreateRuralProducer';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Producers() {
  const router = useRouter();
  const {
    mutateAsync: handleCreateRuralProducer,
    isPending: createRuralProducerIsLoading,
  } = useCreateRuralProducer();

  const handleFormSubmit = async (formData: RuralProducerFormData) => {
    try {
      const { document, ...ruralProducer } = formData;
      await handleCreateRuralProducer({
        document: document.replace(/\D/g, ''),
        ...ruralProducer,
      });
      toast.success('Produtor cadastrado com sucesso');
      router.push('/producers');
    } catch (error) {
      toast.error('Erro ao cadastrar produtor');
    }
  };

  return (
    <main className="flex h-full w-full flex-col items-center gap-8 overflow-auto p-4">
      <h1>Cadastrar novo Produtor</h1>
      <RuralProducerForm
        type="create"
        onSubmit={handleFormSubmit}
        isLoading={createRuralProducerIsLoading}
      />
    </main>
  );
}
