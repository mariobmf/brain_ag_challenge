import { test } from '@japa/runner'
import { EditRuralProducerUseCase } from './edit-rural-producer.use-case'
import { InMemoryRuralProducersRepository } from 'Tests/repositories/in-memory-rural-producers.repository'
import { makeRuralProducer } from 'Tests/factories/make-rural-producer.factory'
import { EditRuralProducerErrors } from '../edit-rural-producer'

let inMemoryRuralProducersRepository: InMemoryRuralProducersRepository
let sut: EditRuralProducerUseCase

test.group('EditRuralProducerUseCase', (group) => {
  group.each.setup(() => {
    inMemoryRuralProducersRepository = new InMemoryRuralProducersRepository()
    sut = new EditRuralProducerUseCase(inMemoryRuralProducersRepository)
  })

  test('Should edit an rural producer', async ({ expect }) => {
    const ruralProducer = makeRuralProducer()
    inMemoryRuralProducersRepository.items.push(ruralProducer)
    await sut.execute({
      id: ruralProducer.id.toString(),
      city: 'new-city',
      cultivableAreaInHectares: 999,
      farmName: 'new-farm-name',
      name: 'new-name',
      plantedCrops: ['corn'],
      state: 'new-state',
      totalAreaInHectaresOfTheFarm: 999,
      vegetationAreaInHectares: 999,
    })
    expect(inMemoryRuralProducersRepository.items[0].id.toString()).toEqual(
      ruralProducer.id.toString()
    )
    expect(inMemoryRuralProducersRepository.items[0].document.value).toEqual(
      ruralProducer.document.value
    )
    expect(inMemoryRuralProducersRepository.items[0]).toMatchObject({
      city: 'new-city',
      cultivableAreaInHectares: 999,
      farmName: 'new-farm-name',
      name: 'new-name',
      plantedCrops: ['corn'],
      state: 'new-state',
      totalAreaInHectaresOfTheFarm: 999,
      vegetationAreaInHectares: 999,
    })
  })

  test('Should NOT edit an rural producer with invalid ID', async ({ expect }) => {
    const response = await sut.execute({
      id: 'invalid-id',
      city: 'new-city',
      cultivableAreaInHectares: 999,
      farmName: 'new-farm-name',
      name: 'new-name',
      plantedCrops: ['corn'],
      state: 'new-state',
      totalAreaInHectaresOfTheFarm: 999,
      vegetationAreaInHectares: 999,
    })
    expect(response.isFailure()).toBeTruthy()
    expect(response.value).toBeInstanceOf(EditRuralProducerErrors.RuralProducerNotFound)
  })
})
