import { Either, failure, success } from 'App/core/either'
import { DeleteRuralProducerErrors } from '.'
import { RuralProducersRepository } from '../../repositories/rural-producers-repository'

interface DeleteRuralProducerUseCaseRequest {
  id: string
}

type Response = Either<DeleteRuralProducerErrors.RuralProducerNotFound, null>

export class DeleteRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(props: DeleteRuralProducerUseCaseRequest): Promise<Response> {
    const ruralProducer = await this.ruralProducersRepository.findById(props.id)
    if (!ruralProducer) return failure(new DeleteRuralProducerErrors.RuralProducerNotFound())
    await this.ruralProducersRepository.delete(ruralProducer)
    return success(null)
  }
}
