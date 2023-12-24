import { RuralProducersRepository } from '../../repositories/rural-producers-repository'
import { Summary } from 'App/domain/rural-producer/enterprise/entities/summary'

interface GetSummaryOfRuralProducersUseCaseResponse {
  summary: Summary
}

export class GetSummaryOfRuralProducersUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(): Promise<GetSummaryOfRuralProducersUseCaseResponse> {
    const ruralProducers = await this.ruralProducersRepository.findAll()
    const summary = Summary.create({ ruralProducers })

    return { summary }
  }
}
