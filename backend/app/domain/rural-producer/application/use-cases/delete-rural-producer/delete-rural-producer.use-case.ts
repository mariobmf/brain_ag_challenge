import { RuralProducersRepository } from '../../repositories/rural-producers-repository'

interface DeleteRuralProducerUseCaseRequest {
  id: string
}

export class DeleteRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(props: DeleteRuralProducerUseCaseRequest) {
    const ruralProducer = await this.ruralProducersRepository.findById(props.id)
    if (!ruralProducer) {
      throw new Error('Rural Producer not found')
    }
    await this.ruralProducersRepository.delete(ruralProducer)
  }
}
