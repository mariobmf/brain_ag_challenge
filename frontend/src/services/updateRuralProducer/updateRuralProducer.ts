import { RuralProducer } from '@/interfaces/RuralProducer';
import { API } from '../axios';

export const updateRuralProducer = async (ruralProducer: RuralProducer) => {
  const { id, ...ruralProducerData } = ruralProducer;
  await API.put(`rural-producers/${id}`, ruralProducerData);
};
