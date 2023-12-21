import { test } from '@japa/runner'
import { CreateRuralProducerUseCase } from './create-rural-producer.use-case'
import { InMemoryRuralProducersRepository } from 'Tests/repositories/in-memory-rural-producers.repository'

let inMemoryRuralProducersRepository: InMemoryRuralProducersRepository
let sut: CreateRuralProducerUseCase

test.group('CreateRuralProducerUseCase', (group) => {
  group.each.setup(() => {
    inMemoryRuralProducersRepository = new InMemoryRuralProducersRepository()
    sut = new CreateRuralProducerUseCase(inMemoryRuralProducersRepository)
  })

  test('Should create an rural producer', async ({ expect }) => {
    await sut.execute({
      document: '12345678910',
      name: 'Name',
      farmName: 'Farm Name',
      city: 'City',
      state: 'State',
      totalAreaInHectaresOfTheFarm: 100,
      cultivableAreaInHectares: 100,
      vegetationAreaInHectares: 100,
      plantedCrops: 'soy',
    })

    expect(inMemoryRuralProducersRepository.items).toHaveLength(1)
  })
})
