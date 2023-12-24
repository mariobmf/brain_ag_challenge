import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RuralProducerModel from 'App/Models/RuralProducer'

export default class RuralProducerSeeder extends BaseSeeder {
  public async run() {
    await RuralProducerModel.createMany([
      {
        id: '945dc786-813b-487e-8d73-6d889c54b0ac',
        document: '50650677080',
        name: 'João da Silva',
        farm_name: 'Fazenda São João',
        city: 'São Paulo',
        state: 'SP',
        total_area_in_hectares_of_the_farm: 10,
        cultivable_area_in_hectares: 5,
        vegetation_area_in_hectares: 5,
        planted_crops: ['soy', 'corn'],
      },
      {
        id: '40bb45fa-1dc5-48f7-b970-bdd266015df7',
        document: '13244667074',
        name: 'José da Silva',
        farm_name: 'Fazenda São José',
        city: 'São Paulo',
        state: 'SP',
        total_area_in_hectares_of_the_farm: 8,
        cultivable_area_in_hectares: 5,
        vegetation_area_in_hectares: 3,
        planted_crops: ['sugarcane'],
      },
      {
        id: 'e8d0ec7b-b49f-4cf7-818d-8acc812c521a',
        document: '79389308062',
        name: 'Claudia da Silva',
        farm_name: 'Fazenda da Claudia',
        city: 'São Lourenço',
        state: 'MG',
        total_area_in_hectares_of_the_farm: 10,
        cultivable_area_in_hectares: 8,
        vegetation_area_in_hectares: 2,
        planted_crops: ['cotton', 'coffee'],
      },
    ])
  }
}
