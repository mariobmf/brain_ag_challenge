import { RuralProducer } from '@/interfaces/RuralProducer';
import { updateRuralProducer } from '@/services/updateRuralProducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateRuralProducer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: RuralProducer) =>
      updateRuralProducer({
        ...props,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['rural_producers'] }),
  });
}
