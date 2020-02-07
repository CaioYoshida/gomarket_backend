'use strict'

const Routes = use('Route')

Routes.post('users', 'UserController.store').validator('User')
Routes.post('sessions', 'SessionController.store')

Routes.group(() => {}).middleware(['auth'])

Routes.get('products', 'ProductController.index')
Routes.get('products/:id', 'ProductController.show')
Routes.post('products', 'ProductController.store').validator('Product/Store')
Routes.put('products/:id', 'ProductController.update').validator('Product/Update')
Routes.delete('products/:id', 'ProductController.delete')
