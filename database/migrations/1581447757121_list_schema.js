'use strict'

const Schema = use('Schema')

class ListSchema extends Schema {
  up () {
    this.create('lists', (table) => {
      table.increments()
      table.date('date')
      table.string('location')
      table.json('products')
      table.timestamps()
    })
  }

  down () {
    this.drop('lists')
  }
}

module.exports = ListSchema
