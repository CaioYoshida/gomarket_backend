'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'string|required',
      brand: 'string|required',
      unit_type: 'string|required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
