import { getRuralProducer } from '@/services/getRuralProducer';
import { useQuery } from '@tanstack/react-query';

interface useGetUserProps {
  id: string;
}

export function useGetRuralProducer({ id }: useGetUserProps) {
  return useQuery({
    queryKey: ['rural_producers', id],
    queryFn: () => getRuralProducer(id),
  });
}
