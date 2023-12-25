import { RuralProducer } from '@/interfaces/RuralProducer';
import { createRuralProducer } from '.';
import { API } from '../axios';

jest.mock('../axios', () => ({
  API: {
    post: jest.fn(),
  },
}));

describe('createRuralProducer', () => {
  it('should send a rural producer creation request via the api service', async () => {
    const ruralProducer: Omit<RuralProducer, 'id'> = {
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

    await createRuralProducer(ruralProducer);

    expect(API.post).toHaveBeenCalledWith('rural-producers', ruralProducer);
  });
});
