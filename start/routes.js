'use strict'

const Routes = use('Route')

Routes.post('users', 'UserController.store').validator('User')
Routes.post('sessions', 'SessionController.store')

Routes.group(() => {}).middleware(['auth'])

Routes.resource('products', 'ProductController').apiOnly()
  .validator(new Map(
    [
      [
        ['products.store'],
        ['Product/Store']
      ],
      [
        ['products.update'],
        ['Product/Update']
      ]
    ]
  ))

Routes.resource('products.prices', 'PriceController').apiOnly()
  .validator(new Map(
    [
      [
        ['products.prices.store'],
        ['Price']
      ],
      [
        ['products.prices.update'],
        ['Price']
      ]
    ]
  ))

Routes.resource('lists', 'ListController').apiOnly()
