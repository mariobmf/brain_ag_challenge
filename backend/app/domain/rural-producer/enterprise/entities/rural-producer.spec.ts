import { test } from '@japa/runner'
import { RuralProducer } from './rural-producer'
import { Document } from './value-objects/document'

test.group('RuralProducerEntity', () => {
  test('Should create an Rural Producer', async ({ expect }) => {
    const ruralProducer = RuralProducer.create({
      document: Document.create('71779879083'),
      name: 'Rural Producer',
      farmName: 'Farm Name',
      city: 'City',
      state: 'State',
      totalAreaInHectaresOfTheFarm: 100,
      cultivableAreaInHectares: 50,
      vegetationAreaInHectares: 50,
      plantedCrops: ['soy'],
    })
    expect(ruralProducer).toMatchObject({
      name: 'Rural Producer',
      farmName: 'Farm Name',
      city: 'City',
      state: 'State',
      totalAreaInHectaresOfTheFarm: 100,
      cultivableAreaInHectares: 50,
      vegetationAreaInHectares: 50,
      plantedCrops: ['soy'],
    })
  })
})
