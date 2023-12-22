import { RuralProducersRepository } from '../../repositories/rural-producers-repository'

interface Summary {
  totalFarmsQuantity: number
  totalFarmsAreaInHectares: number
}

interface GetSummaryOfRuralProducersUseCaseResponse {
  summary: Summary
}

export class GetSummaryOfRuralProducersUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(): Promise<GetSummaryOfRuralProducersUseCaseResponse> {
    const ruralProducers = await this.ruralProducersRepository.findAll()
    const initialSummary: Summary = {
      totalFarmsQuantity: 0,
      totalFarmsAreaInHectares: 0,
    }
    const summary = ruralProducers.reduce((acc, ruralProducer) => {
      return {
        totalFarmsQuantity: acc.totalFarmsQuantity + 1,
        totalFarmsAreaInHectares:
          acc.totalFarmsAreaInHectares + ruralProducer.totalAreaInHectaresOfTheFarm,
      }
    }, initialSummary)

    return { summary }
  }
}
