'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('brand', 30)
      table.string('unit_type', 20).notNullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
