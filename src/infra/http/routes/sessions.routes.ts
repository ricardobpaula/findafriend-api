import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import makeAuthUserController from '@infra/http/factories/accounts/AuthUserControllerFactory'
import { Router } from 'express'

const routes = Router()

routes.post('/login', adaptExpressRoute(makeAuthUserController()))

export default routes
