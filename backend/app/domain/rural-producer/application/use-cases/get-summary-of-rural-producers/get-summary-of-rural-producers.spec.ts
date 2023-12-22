import { test } from '@japa/runner'
import { InMemoryRuralProducersRepository } from 'Tests/repositories/in-memory-rural-producers.repository'
import { makeRuralProducer } from 'Tests/factories/make-rural-producer.factory'
import { GetSummaryOfRuralProducersUseCase } from './get-summary-of-rural-producers'

let inMemoryRuralProducersRepository: InMemoryRuralProducersRepository
let sut: GetSummaryOfRuralProducersUseCase

test.group('GetSummaryOfRuralProducersUseCase', (group) => {
  group.each.setup(() => {
    inMemoryRuralProducersRepository = new InMemoryRuralProducersRepository()
    sut = new GetSummaryOfRuralProducersUseCase(inMemoryRuralProducersRepository)
  })

  test('Should return the summary of rural producers', async ({ expect }) => {
    const ruralProducer1 = makeRuralProducer()
    const ruralProducer2 = makeRuralProducer()
    inMemoryRuralProducersRepository.items.push(ruralProducer1, ruralProducer2)
    const useCaseResponse = await sut.execute()
    expect(useCaseResponse.summary.totalFarmsQuantity).toEqual(2)
    expect(useCaseResponse.summary.totalFarmsAreaInHectares).toEqual(
      ruralProducer1.totalAreaInHectaresOfTheFarm + ruralProducer2.totalAreaInHectaresOfTheFarm
    )
  })
})
