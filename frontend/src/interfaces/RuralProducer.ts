export type PlantedCropsType =
  | 'soy'
  | 'corn'
  | 'cotton'
  | 'coffee'
  | 'sugarcane';

export const PlantedCrops = {
  soy: 'Soja',
  corn: 'Milho',
  cotton: 'Algodão',
  coffee: 'Café',
  sugarcane: 'Cana de açúcar',
};

export interface RuralProducer {
  id: string;
  document: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalAreaInHectaresOfTheFarm: number;
  cultivableAreaInHectares: number;
  vegetationAreaInHectares: number;
  plantedCrops: PlantedCropsType[];
}
