import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RuralProducer extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public document: string

  @column()
  public name: string

  @column()
  public farm_name: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public total_area_in_hectares_of_the_farm: number

  @column()
  public cultivable_area_in_hectares: number

  @column()
  public vegetation_area_in_hectares: number

  @column()
  public planted_crops: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
