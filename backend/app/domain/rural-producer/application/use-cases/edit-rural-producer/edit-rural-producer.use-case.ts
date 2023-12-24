import { PlantedCropType } from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { RuralProducersRepository } from '../../repositories/rural-producers-repository'
import { Either, failure, success } from 'App/core/either'
import { EditRuralProducerErrors } from '../edit-rural-producer'

interface EditRuralProducerUseCaseRequest {
  id: string
  name: string
  farmName: string
  city: string
  state: string
  totalAreaInHectaresOfTheFarm: number
  cultivableAreaInHectares: number
  vegetationAreaInHectares: number
  plantedCrops: PlantedCropType[]
}

type Response = Either<EditRuralProducerErrors.RuralProducerNotFound, null>

export class EditRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(props: EditRuralProducerUseCaseRequest): Promise<Response> {
    const {
      id,
      city,
      cultivableAreaInHectares,
      farmName,
      name,
      plantedCrops,
      state,
      totalAreaInHectaresOfTheFarm,
      vegetationAreaInHectares,
    } = props
    const ruralProducer = await this.ruralProducersRepository.findById(id)
    if (!ruralProducer) return failure(new EditRuralProducerErrors.RuralProducerNotFound())
    ruralProducer.city = city
    ruralProducer.cultivableAreaInHectares = cultivableAreaInHectares
    ruralProducer.farmName = farmName
    ruralProducer.name = name
    ruralProducer.plantedCrops = plantedCrops
    ruralProducer.state = state
    ruralProducer.totalAreaInHectaresOfTheFarm = totalAreaInHectaresOfTheFarm
    ruralProducer.vegetationAreaInHectares = vegetationAreaInHectares
    await this.ruralProducersRepository.save(ruralProducer)
    return success(null)
  }
}
