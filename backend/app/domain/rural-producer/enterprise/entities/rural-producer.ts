import { Entity } from 'App/core/entities/entity'
import { Document } from './value-objects/document'
import { UniqueEntityId } from 'App/core/entities/unique-entity-id'

export type PlantedCropType = 'soy' | 'corn' | 'cotton' | 'coffee' | 'sugarcane'

export interface RuralProducerProps {
  document: Document
  name: string
  farmName: string
  city: string
  state: string
  totalAreaInHectaresOfTheFarm: number
  cultivableAreaInHectares: number
  vegetationAreaInHectares: number
  plantedCrops: PlantedCropType[]
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
  public set name(name: string) {
    this.props.name = name
  }

  public get farmName() {
    return this.props.farmName
  }
  public set farmName(farmName: string) {
    this.props.farmName = farmName
  }

  public get city() {
    return this.props.city
  }
  public set city(city: string) {
    this.props.city = city
  }

  public get state() {
    return this.props.state
  }
  public set state(state: string) {
    this.props.state = state
  }

  public get totalAreaInHectaresOfTheFarm() {
    return this.props.totalAreaInHectaresOfTheFarm
  }
  public set totalAreaInHectaresOfTheFarm(totalAreaInHectaresOfTheFarm: number) {
    this.props.totalAreaInHectaresOfTheFarm = totalAreaInHectaresOfTheFarm
  }

  public get cultivableAreaInHectares() {
    return this.props.cultivableAreaInHectares
  }
  public set cultivableAreaInHectares(cultivableAreaInHectares: number) {
    this.props.cultivableAreaInHectares = cultivableAreaInHectares
  }

  public get vegetationAreaInHectares() {
    return this.props.vegetationAreaInHectares
  }
  public set vegetationAreaInHectares(vegetationAreaInHectares: number) {
    this.props.vegetationAreaInHectares = vegetationAreaInHectares
  }

  public get plantedCrops() {
    return this.props.plantedCrops
  }
  public set plantedCrops(plantedCrops: PlantedCropType[]) {
    this.props.plantedCrops = plantedCrops
  }
}
