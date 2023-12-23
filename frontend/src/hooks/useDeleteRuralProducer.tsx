import { deleteRuralProducer } from '@/services/deleteRuralProducer/deleteRuralProducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteRuralProducer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRuralProducer(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['rural_producers'] }),
  });
}
