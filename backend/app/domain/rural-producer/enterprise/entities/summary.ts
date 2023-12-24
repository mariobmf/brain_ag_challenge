import { Entity } from 'App/core/entities/entity'
import { UniqueEntityId } from 'App/core/entities/unique-entity-id'
import { PlantedCropType, RuralProducer } from './rural-producer'

type TotalByType = {
  name: string
  value: number
}

export interface SummaryProps {
  ruralProducers: RuralProducer[]
}

export class Summary extends Entity<SummaryProps> {
  static create(props: SummaryProps, id?: UniqueEntityId) {
    const ruralProducer = new Summary(props, id)
    return ruralProducer
  }

  public get totalFarmsQuantity() {
    return this.props.ruralProducers.length
  }

  public get totalFarmsAreaInHectares() {
    return this.props.ruralProducers.reduce((acc, ruralProducer) => {
      return acc + ruralProducer.totalAreaInHectaresOfTheFarm
    }, 0)
  }

  public get totalProducersByStateQuantity() {
    return this.props.ruralProducers.reduce((acc, ruralProducer) => {
      const state = ruralProducer.state
      const findStateIndex = acc.findIndex((item) => item.name === state)
      if (findStateIndex === -1) {
        acc.push({
          name: state,
          value: 1,
        })
      } else {
        acc[findStateIndex].value += 1
      }
      return acc
    }, [] as TotalByType[])
  }

  public get totalByPlantedCropQuantity() {
    const totalPlantedCrops = this.props.ruralProducers.reduce((acc, producer) => {
      return [...acc, ...producer.plantedCrops]
    }, [] as PlantedCropType[])
    return totalPlantedCrops.reduce((acc, plantedCrop) => {
      const findPlantedCropsIndex = acc.findIndex((item) => item.name === plantedCrop)
      if (findPlantedCropsIndex === -1) {
        acc.push({
          name: plantedCrop,
          value: 1,
        })
      } else {
        acc[findPlantedCropsIndex].value += 1
      }
      return acc
    }, [] as TotalByType[])
  }

  public get totalByAreaTypeInHectares() {
    return this.props.ruralProducers.reduce((acc, ruralProducer) => {
      const findCultivableIndex = acc.findIndex((item) => item.name === 'Agricultável')
      if (findCultivableIndex === -1) {
        acc.push({
          name: 'Agricultável',
          value: ruralProducer.cultivableAreaInHectares,
        })
      } else {
        acc[findCultivableIndex].value += ruralProducer.cultivableAreaInHectares
      }
      const findVegetationIndex = acc.findIndex((item) => item.name === 'Vegetação')
      if (findVegetationIndex === -1) {
        acc.push({
          name: 'Vegetação',
          value: ruralProducer.vegetationAreaInHectares,
        })
      } else {
        acc[findVegetationIndex].value += ruralProducer.vegetationAreaInHectares
      }
      return acc
    }, [] as TotalByType[])
  }
}
