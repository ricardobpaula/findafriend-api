import adapterMiddleware from '@infra/gateways/ExpressMiddlewareAdapter'
import { Router } from 'express'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import usersRouter from './accounts/users.routes'

const routes = Router()

routes.use('/users', usersRouter)

routes.use(adapterMiddleware(makeEnsureAuthenticatedMiddleware()))
export default routes
