import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import dotenv from 'dotenv'
import routes from './routes/index.routes'

dotenv.config()

const app = express()

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())

app.use('/', routes)

export default app
