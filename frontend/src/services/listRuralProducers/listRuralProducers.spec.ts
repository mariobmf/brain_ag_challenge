import { listRuralProducers } from '.';
import { API } from '../axios';

const ruralProducerData = {
  id: '1',
  document: '12345678910',
  name: 'Test RuralProducer',
  farmName: 'Test Farm',
  city: 'Test City',
  state: 'Test State',
  totalAreaInHectaresOfTheFarm: 100,
  cultivableAreaInHectares: 50,
  vegetationAreaInHectares: 50,
  plantedCrops: ['soy', 'corn'],
};
jest.mock('../axios', () => ({
  API: {
    get: jest.fn().mockImplementation(props => {
      return props.id === '1' ? ruralProducerData : null;
    }),
  },
}));

describe('getRuralProducer', () => {
  it('should send a rural producer get request via the api service', async () => {
    await listRuralProducers();

    expect(API.get).toHaveBeenCalled();
  });
});
