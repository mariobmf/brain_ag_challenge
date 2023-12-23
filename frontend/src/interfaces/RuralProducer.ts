export type PlantedCrops = 'soy' | 'corn' | 'cotton' | 'coffee' | 'sugarcane';

export interface RuralProducer {
  document: Document;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalAreaInHectaresOfTheFarm: number;
  cultivableAreaInHectares: number;
  vegetationAreaInHectares: number;
  plantedCrops: PlantedCrops[];
}
