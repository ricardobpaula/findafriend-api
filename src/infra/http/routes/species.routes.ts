import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import { Router } from 'express'
import makeCreateSpecieController from '../factories/pets/CreateSpecieControllerFactory'
import makeGetAllSpeciesController from '../factories/pets/GetAllSpeciesControllerFactory'

const routes = Router()

routes.post('/', adaptExpressRoute(makeCreateSpecieController()))
routes.get('/', adaptExpressRoute(makeGetAllSpeciesController()))

export default routes
