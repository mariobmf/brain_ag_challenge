import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import {
  CreateRuralProducerErrors,
  CreateRuralProducerUseCase,
} from 'App/domain/rural-producer/application/use-cases/create-rural-producer'
import {
  DeleteRuralProducerErrors,
  DeleteRuralProducerUseCase,
} from 'App/domain/rural-producer/application/use-cases/delete-rural-producer'
import {
  EditRuralProducerErrors,
  EditRuralProducerUseCase,
} from 'App/domain/rural-producer/application/use-cases/edit-rural-producer'
import {
  GetRuralProducerErrors,
  GetRuralProducerUseCase,
} from 'App/domain/rural-producer/application/use-cases/get-rural-producer'
import { ListRuralProducersUseCase } from 'App/domain/rural-producer/application/use-cases/list-rural-producers'
import { PlantedCrops } from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import { RuralProducerViewModel } from 'App/infra/http/view-models/rural-producer.view-model'
import { LucidRuralProducersRepository } from 'Database/repositories/lucid-rural-producers.repository'

export default class RuralProducersController {
  private ruralProducersRepository: LucidRuralProducersRepository

  constructor() {
    this.ruralProducersRepository = new LucidRuralProducersRepository()
  }

  public async index({ response }: HttpContextContract) {
    const listRuralProducersUseCase = new ListRuralProducersUseCase(this.ruralProducersRepository)
    const responseUseCase = await listRuralProducersUseCase.execute()
    response.json(responseUseCase.ruralProducers.map(RuralProducerViewModel.toHTTP))
  }

  public async store({ request, response }: HttpContextContract) {
    const ruralProducerSchema = schema.create({
      document: schema.string([rules.minLength(11), rules.maxLength(14)]),
      name: schema.string(),
      farmName: schema.string(),
      city: schema.string(),
      state: schema.string(),
      totalAreaInHectaresOfTheFarm: schema.number(),
      cultivableAreaInHectares: schema.number(),
      vegetationAreaInHectares: schema.number(),
      plantedCrops: schema
        .array()
        .members(schema.enum(['soy', 'corn', 'cotton', 'coffee', 'sugarcane'])),
    })
    try {
      const payload = await request.validate({
        schema: ruralProducerSchema,
      })
      const {
        document,
        name,
        farmName,
        city,
        state,
        totalAreaInHectaresOfTheFarm,
        cultivableAreaInHectares,
        vegetationAreaInHectares,
        plantedCrops,
      } = payload
      const createRuralProducerUseCase = new CreateRuralProducerUseCase(
        this.ruralProducersRepository
      )
      const useCaseResponse = await createRuralProducerUseCase.execute({
        document,
        name,
        farmName,
        city,
        state,
        totalAreaInHectaresOfTheFarm,
        cultivableAreaInHectares,
        vegetationAreaInHectares,
        plantedCrops: plantedCrops as PlantedCrops[],
      })
      if (useCaseResponse.isFailure()) {
        const error = useCaseResponse.value
        const message = error.message
        if (error.constructor === CreateRuralProducerErrors.RuralProducerAlreadyExists)
          return response.status(409).json({
            status: 'error',
            code: 'conflict',
            message: message,
          })
      }
      return response.status(201)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const getRuralProducerUseCase = new GetRuralProducerUseCase(this.ruralProducersRepository)
    const useCaseResponse = await getRuralProducerUseCase.execute({
      id,
    })
    if (useCaseResponse.isFailure()) {
      const error = useCaseResponse.value
      const message = error.message
      if (error.constructor === GetRuralProducerErrors.RuralProducerNotFound)
        return response.status(404).json({
          status: 'error',
          code: 'not_found',
          message: message,
        })
      return response.status(400).json({
        status: 'error',
        code: 'bad_request',
        message: message,
      })
    }
    response.json(RuralProducerViewModel.toHTTP(useCaseResponse.value.ruralProducer))
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const ruralProducerSchema = schema.create({
      name: schema.string(),
      farmName: schema.string(),
      city: schema.string(),
      state: schema.string(),
      totalAreaInHectaresOfTheFarm: schema.number(),
      cultivableAreaInHectares: schema.number(),
      vegetationAreaInHectares: schema.number(),
      plantedCrops: schema
        .array()
        .members(schema.enum(['soy', 'corn', 'cotton', 'coffee', 'sugarcane'])),
    })
    try {
      const payload = await request.validate({
        schema: ruralProducerSchema,
      })
      const {
        name,
        farmName,
        city,
        state,
        totalAreaInHectaresOfTheFarm,
        cultivableAreaInHectares,
        vegetationAreaInHectares,
        plantedCrops,
      } = payload
      const editRuralProducerUseCase = new EditRuralProducerUseCase(this.ruralProducersRepository)
      const useCaseResponse = await editRuralProducerUseCase.execute({
        id,
        name,
        farmName,
        city,
        state,
        totalAreaInHectaresOfTheFarm,
        cultivableAreaInHectares,
        vegetationAreaInHectares,
        plantedCrops: plantedCrops as PlantedCrops[],
      })
      if (useCaseResponse.isFailure()) {
        const error = useCaseResponse.value
        const message = error.message
        if (error.constructor === EditRuralProducerErrors.RuralProducerNotFound)
          return response.status(404).json({
            status: 'error',
            code: 'not_found',
            message: message,
          })
      }
      return response.status(200)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const deleteRuralProducerUseCase = new DeleteRuralProducerUseCase(this.ruralProducersRepository)
    const useCaseResponse = await deleteRuralProducerUseCase.execute({
      id,
    })
    if (useCaseResponse.isFailure()) {
      const error = useCaseResponse.value
      const message = error.message
      if (error.constructor === DeleteRuralProducerErrors.RuralProducerNotFound)
        return response.status(404).json({
          status: 'error',
          code: 'not_found',
          message: message,
        })
    }
    return response.status(200)
  }
}
