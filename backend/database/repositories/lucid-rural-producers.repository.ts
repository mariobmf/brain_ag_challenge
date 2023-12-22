import { RuralProducersRepository } from 'App/domain/rural-producer/application/repositories/rural-producers-repository'
import { RuralProducer } from 'App/domain/rural-producer/enterprise/entities/rural-producer'
import RuralProducerModel from 'App/Models/RuralProducer'
import { LucidRuralProducerMapper } from 'Database/mappers/lucid-rural-producer.mapper'

export class LucidRuralProducersRepository implements RuralProducersRepository {
  async create(ruralProducer: RuralProducer): Promise<void> {
    const rawRuralProducer = LucidRuralProducerMapper.toLucid(ruralProducer)
    await RuralProducerModel.create(rawRuralProducer)
  }

  async save(ruralProducerToSave: RuralProducer): Promise<void> {
    const { id, document, ...rawRuralProducer } =
      LucidRuralProducerMapper.toLucid(ruralProducerToSave)
    await RuralProducerModel.query().where('id', id).update(rawRuralProducer)
  }

  async delete(ruralProducer: RuralProducer): Promise<void> {
    const { id } = LucidRuralProducerMapper.toLucid(ruralProducer)
    await RuralProducerModel.query().where('id', id).delete()
  }

  async findById(id: string): Promise<RuralProducer | null> {
    const rawRuralProducer = await RuralProducerModel.findBy('id', id)
    return rawRuralProducer ? LucidRuralProducerMapper.toDomain(rawRuralProducer) : null
  }

  async findAll(): Promise<RuralProducer[]> {
    const rawRuralProducers = await RuralProducerModel.all()
    return rawRuralProducers.map(LucidRuralProducerMapper.toDomain)
  }
}
