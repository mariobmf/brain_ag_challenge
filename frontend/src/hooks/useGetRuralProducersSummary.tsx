'use client';
import { getRuralProducersSummary } from '@/services/getRuralProducersSummary';
import { useQuery } from '@tanstack/react-query';

export function useGetRuralProducersSummary() {
  return useQuery({
    queryKey: ['rural_producers_summary'],
    queryFn: () => getRuralProducersSummary(),
  });
}
