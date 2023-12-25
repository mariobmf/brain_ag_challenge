import { deleteRuralProducer } from '.';
import { API } from '../axios';

jest.mock('../axios', () => ({
  API: {
    delete: jest.fn(),
  },
}));

describe('deleteRuralProducer', () => {
  it('should send a rural producer deletion request via the api service', async () => {
    const mockId = 'rural_producer_id';

    await deleteRuralProducer(mockId);

    expect(API.delete).toHaveBeenCalledWith(`rural-producers/${mockId}`);
  });
});
