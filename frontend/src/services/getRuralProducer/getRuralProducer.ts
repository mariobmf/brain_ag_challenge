import { RuralProducer } from '@/interfaces/RuralProducer';
import { API } from '../axios';

export const getRuralProducer = async (id: string): Promise<RuralProducer> => {
  const response = await API.get(`rural-producers/${id}`);
  return response.data;
};
