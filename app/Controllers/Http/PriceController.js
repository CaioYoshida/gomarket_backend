'use strict'

const Price = use('App/Models/Price')

class PriceController {
  async index ({ params }) {
    const productId = params.products_id

    const priceList = await Price.query()
      .where('product_id', productId)
      .orderBy('price_date', 'desc')
      .fetch()

    return priceList
  }

  async show ({ params }) {
    const price = await Price.findOrFail(params.id)

    return price
  }

  async store ({ params, request }) {
    const data = request.only(['price', 'location', 'date'])
    const productId = params.products_id

    const user = await Price.create({
      product_id: productId,
      price: data.price,
      price_location: data.location,
      price_date: data.date
    })

    return user
  }

  async update ({ params, request }) {
    const productId = params.products_id
    const price = await Price.findOrFail(params.id)
    const data = request.only(['price', 'location', 'date'])

    price.merge({
      product_id: productId,
      price: data.price,
      price_location: data.location,
      price_date: data.date
    })

    await price.save()

    return price
  }

  async destroy ({ params }) {
    const price = await Price.findOrFail(params.id)

    await price.delete()
  }
}

module.exports = PriceController
