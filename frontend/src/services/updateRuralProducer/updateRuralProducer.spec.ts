import { RuralProducer } from '@/interfaces/RuralProducer';
import { updateRuralProducer } from '.';
import { API } from '../axios';

jest.mock('../axios', () => ({
  API: {
    put: jest.fn(),
  },
}));

describe('updateRuralProducer', () => {
  it('should send a rural producer update request via the api service', async () => {
    const ruralProducer: RuralProducer = {
      id: 'id',
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
    await updateRuralProducer(ruralProducer);
    expect(API.put).toHaveBeenCalledWith(
      `rural-producers/${ruralProducer.id}`,
      {
        document: '12345678910',
        name: 'Test RuralProducer',
        farmName: 'Test Farm',
        city: 'Test City',
        state: 'Test State',
        totalAreaInHectaresOfTheFarm: 100,
        cultivableAreaInHectares: 50,
        vegetationAreaInHectares: 50,
        plantedCrops: ['soy', 'corn'],
      },
    );
  });
});
