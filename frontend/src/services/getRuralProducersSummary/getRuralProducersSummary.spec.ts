import { getRuralProducersSummary } from '.';
import { API } from '../axios';

const ruralProducerData = {
  totalFarmsQuantity: 1,
  totalFarmsAreaInHectares: 10,
};

jest.mock('../axios', () => ({
  API: {
    get: jest.fn().mockImplementation(props => {
      return {
        data: ruralProducerData,
      };
    }),
  },
}));

describe('getRuralProducer', () => {
  it('should send a rural producer get request via the api service', async () => {
    await getRuralProducersSummary();

    expect(API.get).toHaveBeenCalled();
  });
});
