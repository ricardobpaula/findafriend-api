import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import { Router } from 'express'
import makeCreatePetController from '../factories/pets/CreatePetControllerFactory'
import makeFindPetsController from '../factories/pets/FindPetsControllerFactory'

const routes = Router()

routes.post('/', adaptExpressRoute(makeCreatePetController()))
routes.get('/', adaptExpressRoute(makeFindPetsController()))

export default routes
