import { RuralProducer } from '@/interfaces/RuralProducer';
import { API } from '../axios';

export const listRuralProducers = async (): Promise<RuralProducer[]> => {
  const response = await API.get(`rural-producers`);
  return response.data;
};
