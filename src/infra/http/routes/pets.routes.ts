import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import { Router } from 'express'
import makeCreatePetController from '../factories/pets/CreatePetControllerFactory'
import makeFindPetsController from '../factories/pets/FindPetsControllerFactory'
import makeGetPetController from '../factories/pets/GetPetControllerFactory'

const routes = Router()

routes.post('/', adaptExpressRoute(makeCreatePetController()))
routes.get('/', adaptExpressRoute(makeFindPetsController()))
routes.get('/:id', adaptExpressRoute(makeGetPetController()))

export default routes
