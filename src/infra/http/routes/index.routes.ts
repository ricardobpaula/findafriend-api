import adapterMiddleware from '@infra/gateways/ExpressMiddlewareAdapter'
import { Router } from 'express'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import petsRouter from './pets.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/auth', sessionsRouter)

routes.use(adapterMiddleware(makeEnsureAuthenticatedMiddleware()))

routes.use('/pets', petsRouter)

export default routes
