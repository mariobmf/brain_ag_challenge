import { Entity } from 'App/core/entities/entity'
import { Document } from './value-objects/document'
import { UniqueEntityId } from 'App/core/entities/unique-entity-id'

export type PlantedCrops = 'soy' | 'corn' | 'cotton' | 'coffee' | 'sugarcane'

export interface RuralProducerProps {
  document: Document
  name: string
  farmName: string
  city: string
  state: string
  totalAreaInHectaresOfTheFarm: number
  cultivableAreaInHectares: number
  vegetationAreaInHectares: number
  plantedCrops: PlantedCrops
}

export class RuralProducer extends Entity<RuralProducerProps> {
  static create(props: RuralProducerProps, id?: UniqueEntityId) {
    const ruralProducer = new RuralProducer(
      {
        ...props,
      },
      id
    )
    return ruralProducer
  }

  public get document() {
    return this.props.document
  }
  public get name() {
    return this.props.name
  }
  public get farmName() {
    return this.props.farmName
  }
  public get city() {
    return this.props.city
  }
  public get state() {
    return this.props.state
  }
  public get totalAreaInHectaresOfTheFarm() {
    return this.props.totalAreaInHectaresOfTheFarm
  }
  public get cultivableAreaInHectares() {
    return this.props.cultivableAreaInHectares
  }
  public get vegetationAreaInHectares() {
    return this.props.vegetationAreaInHectares
  }
  public get plantedCrops() {
    return this.props.plantedCrops
  }
}
