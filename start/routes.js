'use strict'

const Routes = use('Route')

Routes.post('users', 'UserController.store').validator('User')
Routes.post('sessions', 'SessionController.store')

Routes.group(() => {}).middleware(['auth'])
