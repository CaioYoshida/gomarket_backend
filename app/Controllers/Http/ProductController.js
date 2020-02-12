'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ request }) {
    const { search } = request.all()

    if (search === '') {
      const products = await Product.query().with('prices').orderBy('name').fetch()

      return products
    }

    const products = await Product.query().where('name', 'LIKE', '%' + search + '%').fetch()

    return products
  }

  async show ({ params }) {
    const product = await Product.findOrFail(params.id)

    return product
  }

  async store ({ request, response }) {
    const data = request.only(['name', 'brand', 'unit_type'])

    const productExist = await Product.findBy('name', data.name)

    if (productExist) {
      return response.status(401).send({ error: { message: 'Product already exists' } })
    }

    const user = await Product.create({
      name: data.name,
      brand: data.brand,
      unit_type: data.unit_type
    })

    return user
  }

  async update ({ params, request }) {
    const product = await Product.findOrFail(params.id)
    const data = request.only(['name', 'brand', 'unit_type'])

    product.merge({
      name: data.name,
      brand: data.brand,
      unit_type: data.unit_type
    })

    await product.save()

    return product
  }

  async delete ({ params }) {
    const product = await Product.findOrFail(params.id)

    await product.delete()
  }
}

module.exports = ProductController
