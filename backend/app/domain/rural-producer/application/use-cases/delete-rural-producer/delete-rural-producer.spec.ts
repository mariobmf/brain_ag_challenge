import { test } from '@japa/runner'
import { DeleteRuralProducerUseCase } from './delete-rural-producer.use-case'
import { InMemoryRuralProducersRepository } from 'Tests/repositories/in-memory-rural-producers.repository'
import { makeRuralProducer } from 'Tests/factories/make-rural-producer.factory'

let inMemoryRuralProducersRepository: InMemoryRuralProducersRepository
let sut: DeleteRuralProducerUseCase

test.group('DeleteRuralProducerUseCase', (group) => {
  group.each.setup(() => {
    inMemoryRuralProducersRepository = new InMemoryRuralProducersRepository()
    sut = new DeleteRuralProducerUseCase(inMemoryRuralProducersRepository)
  })

  test('Should delete an rural producer', async ({ expect }) => {
    const ruralProducer = makeRuralProducer()
    inMemoryRuralProducersRepository.items.push(ruralProducer)
    await sut.execute({
      id: ruralProducer.id.toString(),
    })
    expect(inMemoryRuralProducersRepository.items).toHaveLength(0)
  })

  test('Should NOT delete an rural producer with invalid ID', async ({ expect }) => {
    expect(() =>
      sut.execute({
        id: 'invalid-id',
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
