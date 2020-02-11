'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PriceSchema extends Schema {
  up () {
    this.create('prices', (table) => {
      table.increments()
      table
        .integer('product_id')
        .unsigned() // '.unsigned()' means only nonnegative numbers
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.decimal('price')
      table.date('price_date')
      table.string('price_location')
      table.timestamps()
    })
  }

  down () {
    this.drop('prices')
  }
}

module.exports = PriceSchema
