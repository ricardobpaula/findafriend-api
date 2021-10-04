import adaptExpressRoute from '@infra/gateways/ExpressRouteAdapter'
import { Router } from 'express'
import makeCreatePetController from '../factories/pets/CreatePetControllerFactory'

const routes = Router()

routes.post('/', adaptExpressRoute(makeCreatePetController()))

export default routes
