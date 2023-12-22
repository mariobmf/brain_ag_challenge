import { PlantedCrops } from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { RuralProducersRepository } from '../../repositories/rural-producers-repository'

interface EditRuralProducerUseCaseRequest {
  id: string
  name: string
  farmName: string
  city: string
  state: string
  totalAreaInHectaresOfTheFarm: number
  cultivableAreaInHectares: number
  vegetationAreaInHectares: number
  plantedCrops: PlantedCrops
}

export class EditRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute(props: EditRuralProducerUseCaseRequest) {
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
    if (!ruralProducer) {
      throw new Error('Rural Producer not found')
    }
    ruralProducer.city = city
    ruralProducer.cultivableAreaInHectares = cultivableAreaInHectares
    ruralProducer.farmName = farmName
    ruralProducer.name = name
    ruralProducer.plantedCrops = plantedCrops
    ruralProducer.state = state
    ruralProducer.totalAreaInHectaresOfTheFarm = totalAreaInHectaresOfTheFarm
    ruralProducer.vegetationAreaInHectares = vegetationAreaInHectares
    await this.ruralProducersRepository.save(ruralProducer)
  }
}
