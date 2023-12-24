import { Summary } from 'App/domain/rural-producer/enterprise/entities/summary'

export class SummaryViewModel {
  static toHTTP(summary: Summary) {
    return {
      totalByAreaTypeInHectares: summary.totalByAreaTypeInHectares,
      totalByPlantedCropQuantity: summary.totalByPlantedCropQuantity,
      totalFarmsAreaInHectares: summary.totalFarmsAreaInHectares,
      totalFarmsQuantity: summary.totalFarmsQuantity,
      totalProducersByStateQuantity: summary.totalProducersByStateQuantity,
    }
  }
}
