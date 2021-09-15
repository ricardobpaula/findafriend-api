import { Router } from 'express'
import usersRouter from './accounts/users.routes'

const routes = Router()

routes.use('/users', usersRouter)

export default routes
