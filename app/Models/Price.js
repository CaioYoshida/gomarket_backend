'use strict'

const Model = use('Model')

class Price extends Model {
  product () {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = Price
