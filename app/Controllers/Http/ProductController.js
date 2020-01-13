'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async show ({ params }) {
    const product = await Product.findOrFail(params.id)

    return product
  }

  async store ({ request, response }) {
    const data = request.only(['product_name', 'unit_type', 'last_price', 'last_price_location'])

    const productExist = await Product.findByOrFail('product_name', data.product_name)

    if (productExist) {
      return response.status(401).send({ error: { message: 'Product already exists' } })
    }

    const user = await Product.create({
      product_name: data.product_name,
      unit_type: data.unit_type,
      last_price: data.last_price,
      last_price_date: new Date(),
      last_price_location: data.last_price_location,
      best_price: data.last_price,
      best_price_date: new Date(),
      best_price_location: data.last_price_location
    })

    return user
  }

  async update ({ params, request, response }) {
    const product = await Product.findOrFail(params.id)
    const data = request.only(['product_name', 'unit_type', 'last_price', 'last_price_location'])

    const productExist = await Product.findByOrFail('product_name', data.product_name)

    if (productExist) {
      return response.status(401).send({ error: { message: 'Product already exists' } })
    }

    if (productExist.best_price && productExist.best_price > productExist.last_price) {
      product.merge({
        product_name: data.product_name,
        unit_type: data.unit_type,
        last_price: data.last_price,
        last_price_date: new Date(),
        last_price_location: data.last_price_location,
        best_price: data.last_price,
        best_price_date: new Date(),
        best_price_location: data.last_price_location
      })

      await product.save()
    } else {
      product.merge({
        product_name: data.product_name,
        unit_type: data.unit_type,
        last_price: data.last_price,
        last_price_date: new Date(),
        last_price_location: data.last_price_location
      })
    }
  }

  async delete ({ params }) {
    const product = await Product.findOrFail(params.id)

    await product.delete()
  }
}

module.exports = ProductController
