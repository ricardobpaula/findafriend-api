import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import { Router } from 'express'
import makeCreateSpecieController from '../factories/pets/CreateSpecieControllerFactory'

const routes = Router()

routes.post('/', adaptExpressRoute(makeCreateSpecieController()))

export default routes
