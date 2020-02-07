'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index () {
    const products = await Product.query().orderBy('name').fetch()

    return products
  }

  async show ({ params }) {
    const product = await Product.findOrFail(params.id)

    return product
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'brand', 'unit_type', 'last_price', 'last_price_location'])

    const productExist = await Product.findBy('name', data.name)

    if (productExist) {
      return response.status(401).send({ error: { message: 'Product already exists' } })
    }

    const user = await Product.create({
      name: data.name,
      brand: data.brand,
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
    const data = request.only(['name', 'brand', 'unit_type', 'last_price', 'last_price_location'])

    if (product.best_price && product.best_price > data.last_price) {
      product.merge({
        name: data.name,
        brand: data.brand,
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
        brand: data.brand,
        unit_type: data.unit_type,
        last_price: data.last_price,
        last_price_date: new Date(),
        last_price_location: data.last_price_location
      })

      await product.save()
    }

    return product
  }

  async delete ({ params }) {
    const product = await Product.findOrFail(params.id)

    await product.delete()
  }
}

module.exports = ProductController
