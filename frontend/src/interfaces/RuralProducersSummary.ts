type TotalByType = {
  name: string;
  value: number;
};

export interface RuralProducersSummary {
  totalFarmsQuantity: number;
  totalFarmsAreaInHectares: number;
  totalProducersByStateQuantity: TotalByType[];
  totalByPlantedCropQuantity: TotalByType[];
  totalByAreaTypeInHectares: TotalByType[];
}
