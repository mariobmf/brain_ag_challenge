import RawRuralProducer from 'App/Models/RuralProducer'
import { UniqueEntityId } from 'App/core/entities/unique-entity-id'
import {
  PlantedCrops,
  RuralProducer,
} from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { Document } from 'App/domain/rural-producer/enterprise/entities/value-objects/document'

export class LucidRuralProducerMapper {
  static toLucid(ruralProducer: RuralProducer) {
    return {
      id: ruralProducer.id.toString(),
      document: ruralProducer.document.value,
      name: ruralProducer.name,
      farm_name: ruralProducer.farmName,
      city: ruralProducer.city,
      state: ruralProducer.state,
      total_area_in_hectares_of_the_farm: ruralProducer.totalAreaInHectaresOfTheFarm,
      cultivable_area_in_hectares: ruralProducer.cultivableAreaInHectares,
      vegetation_area_in_hectares: ruralProducer.vegetationAreaInHectares,
      planted_crops: ruralProducer.plantedCrops,
    }
  }

  static toDomain(raw: RawRuralProducer): RuralProducer {
    return RuralProducer.create(
      {
        document: Document.create(raw.document),
        name: raw.name,
        farmName: raw.farm_name,
        city: raw.city,
        state: raw.state,
        totalAreaInHectaresOfTheFarm: raw.total_area_in_hectares_of_the_farm,
        cultivableAreaInHectares: raw.cultivable_area_in_hectares,
        vegetationAreaInHectares: raw.vegetation_area_in_hectares,
        plantedCrops: raw.planted_crops as PlantedCrops,
      },
      new UniqueEntityId(raw.id)
    )
  }
}
