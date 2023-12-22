import { test } from '@japa/runner'
import { CreateRuralProducerUseCase } from './create-rural-producer.use-case'
import { InMemoryRuralProducersRepository } from 'Tests/repositories/in-memory-rural-producers.repository'
import { makeRuralProducer } from 'Tests/factories/make-rural-producer.factory'
import { Document } from 'App/domain/rural-producer/enterprise/entities/value-objects/document'
import { CreateRuralProducerErrors } from '../create-rural-producer'

let inMemoryRuralProducersRepository: InMemoryRuralProducersRepository
let sut: CreateRuralProducerUseCase

test.group('CreateRuralProducerUseCase', (group) => {
  group.each.setup(() => {
    inMemoryRuralProducersRepository = new InMemoryRuralProducersRepository()
    sut = new CreateRuralProducerUseCase(inMemoryRuralProducersRepository)
  })

  test('Should create an rural producer', async ({ expect }) => {
    await sut.execute({
      document: '71779879083',
      name: 'Name',
      farmName: 'Farm Name',
      city: 'City',
      state: 'State',
      totalAreaInHectaresOfTheFarm: 100,
      cultivableAreaInHectares: 100,
      vegetationAreaInHectares: 100,
      plantedCrops: ['soy'],
    })

    expect(inMemoryRuralProducersRepository.items).toHaveLength(1)
  })

  test('Should NOT duplicated rural producer', async ({ expect }) => {
    const ruralProducer = makeRuralProducer({ document: Document.create('71779879083') })
    inMemoryRuralProducersRepository.items.push(ruralProducer)
    const response = await sut.execute({
      document: '71779879083',
      name: 'Name',
      farmName: 'Farm Name',
      city: 'City',
      state: 'State',
      totalAreaInHectaresOfTheFarm: 100,
      cultivableAreaInHectares: 100,
      vegetationAreaInHectares: 100,
      plantedCrops: ['soy'],
    })
    expect(response.isFailure()).toBeTruthy()
    expect(response.value).toBeInstanceOf(CreateRuralProducerErrors.RuralProducerAlreadyExists)
  })
})
