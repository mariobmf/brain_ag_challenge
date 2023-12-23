'use client';

import { listRuralProducers } from '@/services/listRuralProducers';
import { useQuery } from '@tanstack/react-query';

export function useListRuralProducers() {
  return useQuery({
    queryKey: ['rural_producers'],
    queryFn: () => listRuralProducers(),
  });
}
