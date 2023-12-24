import {
  PlantedCropType,
  RuralProducer,
} from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { RuralProducersRepository } from '../../repositories/rural-producers-repository'
import { Document } from 'App/domain/rural-producer/enterprise/entities/value-objects/document'
import { Either, failure, success } from 'App/core/either'
import { CreateRuralProducerErrors } from '../create-rural-producer'

interface CreateRuralProducerUseCaseRequest {
  document: string
  name: string
  farmName: string
  city: string
  state: string
  totalAreaInHectaresOfTheFarm: number
  cultivableAreaInHectares: number
  vegetationAreaInHectares: number
  plantedCrops: PlantedCropType[]
}

type Response = Either<CreateRuralProducerErrors.RuralProducerAlreadyExists, null>

export class CreateRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(props: CreateRuralProducerUseCaseRequest): Promise<Response> {
    const ruralProducerAlreadyExists = await this.ruralProducersRepository.findByDocument(
      props.document
    )
    if (ruralProducerAlreadyExists)
      return failure(new CreateRuralProducerErrors.RuralProducerAlreadyExists())
    const ruralProducer = RuralProducer.create({
      ...props,
      document: Document.create(props.document),
    })
    await this.ruralProducersRepository.create(ruralProducer)
    return success(null)
  }
}
