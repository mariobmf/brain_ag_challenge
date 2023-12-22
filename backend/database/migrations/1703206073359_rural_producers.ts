import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rural_producers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id', { primaryKey: true }).defaultTo(this.raw('uuid_generate_v4()')).notNullable()
      table.string('document').notNullable().unique()
      table.string('name').notNullable()
      table.string('farm_name').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.float('total_area_in_hectares_of_the_farm').notNullable()
      table.float('cultivable_area_in_hectares').notNullable()
      table.float('vegetation_area_in_hectares').notNullable()
      table.specificType('planted_crops', 'text[]').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
