'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('product_name', 80).notNullable().unique()
      table.string('unit_type', 20).notNullable()
      table.decimal('last_price')
      table.date('last_price_date')
      table.string('last_price_location')
      table.decimal('best_price')
      table.date('best_price_date')
      table.string('best_price_location')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
