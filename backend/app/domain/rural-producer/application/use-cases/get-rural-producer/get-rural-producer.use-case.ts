import { RuralProducer } from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { RuralProducersRepository } from '../../repositories/rural-producers-repository'
import { GetRuralProducerErrors } from '../get-rural-producer'
import { Either, failure, success } from 'App/core/either'

interface GetRuralProducerUseCaseRequest {
  id: string
}

interface GetRuralProducerUseCaseResponse {
  ruralProducer: RuralProducer
}

type Response = Either<
  GetRuralProducerErrors.RuralProducerNotFound,
  GetRuralProducerUseCaseResponse
>

export class GetRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute({ id }: GetRuralProducerUseCaseRequest): Promise<Response> {
    const ruralProducer = await this.ruralProducersRepository.findById(id)
    if (!ruralProducer) return failure(new GetRuralProducerErrors.RuralProducerNotFound())
    return success({ ruralProducer })
  }
}
