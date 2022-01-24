import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import makeAuthUserController from '@infra/http/factories/accounts/AuthUserControllerFactory'
import { Router } from 'express'
import makeRefreshTokenController from '../factories/accounts/RefreshTokenControllerFactory'

const routes = Router()

routes.post('/login', adaptExpressRoute(makeAuthUserController()))
routes.post('/refresh_token', adaptExpressRoute(makeRefreshTokenController()))

export default routes
