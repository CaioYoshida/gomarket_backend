'use strict'

const Model = use('Model')

class Product extends Model {
  prices () {
    return this.hasMany('App/Models/Price')
  }
}

module.exports = Product
