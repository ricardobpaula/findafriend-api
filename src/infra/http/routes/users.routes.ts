import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import makeCreateUserController from '@infra/http/factories/accounts/CreateUserControllerFactory'
import { Router } from 'express'

const routes = Router()

routes.post('/', adaptExpressRoute(makeCreateUserController()))

export default routes
