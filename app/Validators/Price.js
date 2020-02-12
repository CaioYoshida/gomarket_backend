'use strict'

const Antl = use('Antl')

class Price {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      price: 'number|required',
      location: 'string|required',
      date: 'date|required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Price
