import { RuralProducersRepository } from 'App/domain/rural-producer/application/repositories/rural-producers-repository'
import { RuralProducer } from 'App/domain/rural-producer/enterprise/entities/rural-producer'

export class InMemoryRuralProducersRepository implements RuralProducersRepository {
  public items: RuralProducer[] = []

  async create(ruralProducer: RuralProducer): Promise<void> {
    this.items.push(ruralProducer)
  }

  async save(ruralProducer: RuralProducer): Promise<void> {
    const ruralProducerIndex = this.items.findIndex((item) => item.id === ruralProducer.id)
    this.items[ruralProducerIndex] = ruralProducer
  }

  async delete(ruralProducer: RuralProducer): Promise<void> {
    const ruralProducerIndex = this.items.findIndex((item) => item.id === ruralProducer.id)
    this.items.splice(ruralProducerIndex, 1)
  }

  async findById(id: string): Promise<RuralProducer | null> {
    const ruralProducer = this.items.find((item) => item.id.toString() === id)
    return ruralProducer ?? null
  }

  async findAll(): Promise<RuralProducer[]> {
    return this.items
  }
}
