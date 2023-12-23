import { RuralProducer } from '@/interfaces/RuralProducer';
import { createRuralProducer } from '@/services/createRuralProducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateRuralProducer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: Omit<RuralProducer, 'id'>) =>
      createRuralProducer({
        ...props,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['rural_producers'] }),
  });
}
