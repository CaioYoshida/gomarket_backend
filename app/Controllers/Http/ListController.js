'use strict'

const List = use('App/Models/List')
const Product = use('App/Models/Product')

class ListController {
  async index () {
    const lists = await List.all()

    return lists
  }

  async show ({ params }) {
    const list = await List.findOrFail(params.id)

    return list
  }

  async store ({ request, response }) {
    const data = request.only(['date', 'location', 'products'])

    const list = await List.create({
      date: data.date,
      location: data.location,
      products: data.products
    })

    return list
  }

  async update ({ params, request, response }) {
    const data = request.only(['date', 'location', 'products'])
    const list = await List.findOrFail(params.id)

    list.merge({
      date: data.date,
      location: data.location,
      products: data.products
    })

    await list.save()

    return list
  }

  async destroy ({ params, request, response }) {
    const list = await List.findOrFail(params.id)

    await list.delete()
  }
}

module.exports = ListController
