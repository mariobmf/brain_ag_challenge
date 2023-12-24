import { test } from '@japa/runner'
import { Summary } from './summary'
import { makeRuralProducer } from 'Tests/factories/make-rural-producer.factory'

test.group('SummaryEntity', () => {
  test('Should create an Rural Producer', async ({ expect }) => {
    const ruralProducer1 = makeRuralProducer({
      state: 'SP',
      cultivableAreaInHectares: 1,
      vegetationAreaInHectares: 1,
      totalAreaInHectaresOfTheFarm: 2,
      plantedCrops: ['soy'],
    })
    const ruralProducer2 = makeRuralProducer({
      state: 'SP',
      cultivableAreaInHectares: 1,
      vegetationAreaInHectares: 1,
      totalAreaInHectaresOfTheFarm: 2,
      plantedCrops: ['soy'],
    })
    const ruralProducer3 = makeRuralProducer({
      state: 'MG',
      cultivableAreaInHectares: 1,
      vegetationAreaInHectares: 1,
      totalAreaInHectaresOfTheFarm: 2,
      plantedCrops: ['coffee'],
    })
    const ruralProducer4 = makeRuralProducer({
      state: 'MG',
      cultivableAreaInHectares: 1,
      vegetationAreaInHectares: 1,
      totalAreaInHectaresOfTheFarm: 2,
      plantedCrops: ['coffee'],
    })

    const summary = Summary.create({
      ruralProducers: [ruralProducer1, ruralProducer2, ruralProducer3, ruralProducer4],
    })
    expect(summary.totalFarmsQuantity).toEqual(4)
    expect(summary.totalFarmsAreaInHectares).toEqual(
      ruralProducer1.totalAreaInHectaresOfTheFarm +
        ruralProducer2.totalAreaInHectaresOfTheFarm +
        ruralProducer3.totalAreaInHectaresOfTheFarm +
        ruralProducer4.totalAreaInHectaresOfTheFarm
    )
    expect(summary.totalProducersByStateQuantity).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'SP',
          value: 2,
        }),
        expect.objectContaining({
          name: 'MG',
          value: 2,
        }),
      ])
    )
    expect(summary.totalByAreaTypeInHectares).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Agricultável',
          value:
            ruralProducer1.cultivableAreaInHectares +
            ruralProducer2.cultivableAreaInHectares +
            ruralProducer3.cultivableAreaInHectares +
            ruralProducer4.cultivableAreaInHectares,
        }),
        expect.objectContaining({
          name: 'Vegetação',
          value:
            ruralProducer1.vegetationAreaInHectares +
            ruralProducer2.vegetationAreaInHectares +
            ruralProducer3.vegetationAreaInHectares +
            ruralProducer4.vegetationAreaInHectares,
        }),
      ])
    )
    expect(summary.totalByPlantedCropQuantity).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'soy',
          value: 2,
        }),
        expect.objectContaining({
          name: 'coffee',
          value: 2,
        }),
      ])
    )
  })
})
