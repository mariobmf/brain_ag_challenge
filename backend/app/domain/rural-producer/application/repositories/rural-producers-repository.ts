import { RuralProducer } from '../../enterprise/entities/rural-producer'

export interface RuralProducersRepository {
  findById(id: string): Promise<RuralProducer | null>
  findByDocument(document: string): Promise<RuralProducer | null>
  findAll(): Promise<RuralProducer[]>
  create(ruralProducer: RuralProducer): Promise<void>
  delete(ruralProducer: RuralProducer): Promise<void>
  save(ruralProducer: RuralProducer): Promise<void>
}
