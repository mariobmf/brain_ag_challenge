import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GetSummaryOfRuralProducersUseCase } from 'App/domain/rural-producer/application/use-cases/get-summary-of-rural-producers'
import { LucidRuralProducersRepository } from 'Database/repositories/lucid-rural-producers.repository'

export default class GetSummaryController {
  public async handle({ response }: HttpContextContract) {
    const ruralProducersRepository = new LucidRuralProducersRepository()
    const getSummaryUseCase = new GetSummaryOfRuralProducersUseCase(ruralProducersRepository)
    const responseUseCase = await getSummaryUseCase.execute()
    response.json(responseUseCase)
  }
}
