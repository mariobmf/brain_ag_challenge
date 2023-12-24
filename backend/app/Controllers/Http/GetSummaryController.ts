import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GetSummaryOfRuralProducersUseCase } from 'App/domain/rural-producer/application/use-cases/get-summary-of-rural-producers'
import { SummaryViewModel } from 'App/http/view-models/summary.view-model'
import { LucidRuralProducersRepository } from 'Database/repositories/lucid-rural-producers.repository'

export default class GetSummaryController {
  public async handle({ response }: HttpContextContract) {
    const ruralProducersRepository = new LucidRuralProducersRepository()
    const getSummaryUseCase = new GetSummaryOfRuralProducersUseCase(ruralProducersRepository)
    const responseUseCase = await getSummaryUseCase.execute()
    response.json(SummaryViewModel.toHTTP(responseUseCase.summary))
  }
}
