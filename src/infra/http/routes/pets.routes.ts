import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => { res.json({ msg: 'Hello World' }) })

export default routes
