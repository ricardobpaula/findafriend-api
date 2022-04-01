import { Router } from 'express'

import adapterMiddleware from '@infra/gateways/ExpressMiddlewareAdapter'
import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'

import makeCreateUserController from '@infra/http/factories/accounts/CreateUserControllerFactory'
import makeUpdateAvatarController from '../factories/accounts/UpdateAvatarControllerFactory'

import makeEnsureAuthenticatedMiddleware from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import makeEnsureUploadFileMiddleware from '../factories/middlewares/EnsureUploadFileFactory'
import makeViewProfileController from '../factories/accounts/ViewProfileControllerFactory'
import makeUpdateUserController from '../factories/accounts/UpdateUserControllerFactory'

const routes = Router()

routes.post('/', adaptExpressRoute(makeCreateUserController()))

routes.use(adapterMiddleware(makeEnsureAuthenticatedMiddleware()))

routes.post('/avatar',
  adapterMiddleware(makeEnsureUploadFileMiddleware()),
  adaptExpressRoute(makeUpdateAvatarController())
)

routes.put('/', adaptExpressRoute(makeUpdateUserController()))
routes.get('/me', adaptExpressRoute(makeViewProfileController()))

export default routes
