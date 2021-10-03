import adapterMiddleware from '@infra/gateways/ExpressMiddlewareAdapter'
import { Router } from 'express'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import usersRouter from './accounts/users.routes'
import sessionsRouter from './accounts/sessions.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/auth', sessionsRouter)

routes.use(adapterMiddleware(makeEnsureAuthenticatedMiddleware()))
export default routes
