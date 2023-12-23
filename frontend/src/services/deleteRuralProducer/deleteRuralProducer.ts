import { API } from '../axios';

export const deleteRuralProducer = async (id: string) => {
  await API.delete(`rural-producers/${id}`);
};
