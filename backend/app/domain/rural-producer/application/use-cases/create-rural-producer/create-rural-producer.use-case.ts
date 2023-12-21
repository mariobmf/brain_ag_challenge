import {
  PlantedCrops,
  RuralProducer,
} from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { RuralProducersRepository } from '../../repositories/rural-producers-repository'
import { Document } from 'App/domain/rural-producer/enterprise/entities/value-objects/document'

interface CreateRuralProducerUseCaseRequest {
  document: string
  name: string
  farmName: string
  city: string
  state: string
  totalAreaInHectaresOfTheFarm: number
  cultivableAreaInHectares: number
  vegetationAreaInHectares: number
  plantedCrops: PlantedCrops
}

export class CreateRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(props: CreateRuralProducerUseCaseRequest) {
    const ruralProducer = RuralProducer.create({
      ...props,
      document: Document.create(props.document),
    })

    await this.ruralProducersRepository.create(ruralProducer)
  }
}
