import adapterMiddleware from '@infra/gateways/ExpressMiddlewareAdapter'
import { Router } from 'express'
import makeEnsureAuthenticatedMiddleware from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import petsRouter from './pets.routes'
import speciesRouter from './species.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/auth', sessionsRouter)

routes.use(adapterMiddleware(makeEnsureAuthenticatedMiddleware()))

routes.get('/', (req, res) => { res.json({ msg: 'Hello World' }) })

routes.use('/pets', petsRouter)
routes.use('/species', speciesRouter)

export default routes
