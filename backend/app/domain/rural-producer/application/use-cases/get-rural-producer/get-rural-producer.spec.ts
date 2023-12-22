import { test } from '@japa/runner'
import { GetRuralProducerUseCase } from './get-rural-producer.use-case'
import { InMemoryRuralProducersRepository } from 'Tests/repositories/in-memory-rural-producers.repository'
import { makeRuralProducer } from 'Tests/factories/make-rural-producer.factory'
import { GetRuralProducerErrors } from '../get-rural-producer'

let inMemoryRuralProducersRepository: InMemoryRuralProducersRepository
let sut: GetRuralProducerUseCase

test.group('GetRuralProducerUseCase', (group) => {
  group.each.setup(() => {
    inMemoryRuralProducersRepository = new InMemoryRuralProducersRepository()
    sut = new GetRuralProducerUseCase(inMemoryRuralProducersRepository)
  })

  test('Should get rural producer', async ({ expect }) => {
    const ruralProducer1 = makeRuralProducer()
    const ruralProducer2 = makeRuralProducer()
    inMemoryRuralProducersRepository.items.push(ruralProducer1, ruralProducer2)
    const response = await sut.execute({
      id: ruralProducer1.id.toString(),
    })
    expect(response.isSuccess()).toBeTruthy()
    expect(response.value).toMatchObject({
      ruralProducer: {
        name: ruralProducer1.name,
      },
    })
  })

  test('Should NOT get rural producer with invalid ID', async ({ expect }) => {
    const response = await sut.execute({
      id: 'invalid-id',
    })
    expect(response.isFailure()).toBeTruthy()
    expect(response.value).toBeInstanceOf(GetRuralProducerErrors.RuralProducerNotFound)
  })
})
