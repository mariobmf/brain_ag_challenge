'use client';
import { useDeleteRuralProducer } from '@/hooks/useDeleteRuralProducer';
import { useListRuralProducers } from '@/hooks/useListRuralProducers';
import { RuralProducersTable } from './components/RuralProducersTable';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Producers() {
  const router = useRouter();
  const { data: ruralProducers, isLoading } = useListRuralProducers();
  const { mutateAsync: handleDeleteRuralProducer } = useDeleteRuralProducer();

  const editRuralProducer = useCallback(
    async (id: string) => {
      router.push(`/edit/${id}`);
    },
    [router],
  );

  return (
    <main className="flex w-full overflow-x-auto px-2">
      <RuralProducersTable
        isLoading={isLoading}
        ruralProducers={ruralProducers}
        onDelete={handleDeleteRuralProducer}
        onEdit={editRuralProducer}
      />
    </main>
  );
}
