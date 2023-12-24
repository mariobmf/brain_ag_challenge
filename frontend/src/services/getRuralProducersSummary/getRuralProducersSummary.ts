import { API } from '../axios';
import { RuralProducersSummary } from '@/interfaces/RuralProducersSummary';

export const getRuralProducersSummary =
  async (): Promise<RuralProducersSummary> => {
    const response = await API.get(`rural-producers/summary`);
    return response.data;
  };
