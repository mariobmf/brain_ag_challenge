import { RuralProducer } from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { RuralProducersRepository } from '../../repositories/rural-producers-repository'

interface ListRuralProducersUseCaseResponse {
  ruralProducers: RuralProducer[]
}

export class ListRuralProducersUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(): Promise<ListRuralProducersUseCaseResponse> {
    const ruralProducers = await this.ruralProducersRepository.findAll()
    return {
      ruralProducers,
    }
  }
}
