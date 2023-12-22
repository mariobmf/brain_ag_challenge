import { test } from '@japa/runner'
import { ListRuralProducersUseCase } from './list-rural-producers.use-case'
import { InMemoryRuralProducersRepository } from 'Tests/repositories/in-memory-rural-producers.repository'
import { makeRuralProducer } from 'Tests/factories/make-rural-producer.factory'

let inMemoryRuralProducersRepository: InMemoryRuralProducersRepository
let sut: ListRuralProducersUseCase

test.group('ListRuralProducersUseCase', (group) => {
  group.each.setup(() => {
    inMemoryRuralProducersRepository = new InMemoryRuralProducersRepository()
    sut = new ListRuralProducersUseCase(inMemoryRuralProducersRepository)
  })

  test('Should list all rural producers', async ({ expect }) => {
    const ruralProducer1 = makeRuralProducer()
    const ruralProducer2 = makeRuralProducer()
    inMemoryRuralProducersRepository.items.push(ruralProducer1, ruralProducer2)
    const response = await sut.execute()
    expect(response.ruralProducers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: ruralProducer1.name }),
        expect.objectContaining({ name: ruralProducer2.name }),
      ])
    )
  })
})
