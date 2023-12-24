import { RuralProducer } from 'App/domain/rural-producer/enterprise/entities/rural-producer'

export class RuralProducerViewModel {
  static toHTTP(ruralProducer: RuralProducer) {
    return {
      id: ruralProducer.id.toString(),
      document: ruralProducer.document.value,
      name: ruralProducer.name,
      farmName: ruralProducer.farmName,
      city: ruralProducer.city,
      state: ruralProducer.state,
      totalAreaInHectaresOfTheFarm: ruralProducer.totalAreaInHectaresOfTheFarm,
      cultivableAreaInHectares: ruralProducer.cultivableAreaInHectares,
      vegetationAreaInHectares: ruralProducer.vegetationAreaInHectares,
      plantedCrops: ruralProducer.plantedCrops,
    }
  }
}
