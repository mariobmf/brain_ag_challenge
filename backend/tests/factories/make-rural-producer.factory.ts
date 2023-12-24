import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'App/core/entities/unique-entity-id'
import {
  RuralProducer,
  RuralProducerProps,
  PlantedCropType,
} from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { Document } from 'App/domain/rural-producer/enterprise/entities/value-objects/document'

export function makeRuralProducer(override: Partial<RuralProducerProps> = {}, id?: UniqueEntityId) {
  return RuralProducer.create(
    {
      document: Document.create('71779879083'),
      name: faker.person.firstName(),
      farmName: faker.company.name(),
      city: faker.location.city(),
      state: faker.location.state(),
      totalAreaInHectaresOfTheFarm: faker.number.int({ min: 1, max: 100 }),
      cultivableAreaInHectares: faker.number.int({ min: 1, max: 100 }),
      vegetationAreaInHectares: faker.number.int({ min: 1, max: 100 }),
      plantedCrops: faker.helpers.arrayElement([
        'soy',
        'corn',
        'cotton',
        'coffee',
        'sugarcane',
      ]) as unknown as PlantedCropType[],
      ...override,
    },
    id
  )
}
