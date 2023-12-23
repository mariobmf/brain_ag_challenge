import { RuralProducer } from '@/interfaces/RuralProducer';
import { API } from '../axios';

export const createRuralProducer = async (
  ruralProducer: Omit<RuralProducer, 'id'>,
) => {
  await API.post('rural-producers', ruralProducer);
};
