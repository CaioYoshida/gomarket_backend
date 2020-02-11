'use strict'

const Model = use('Model')

class Price extends Model {
  product () {
    return this.belongsTo('App/Model/Product')
  }
}

module.exports = Price
