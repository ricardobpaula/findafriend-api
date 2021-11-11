import { Request, Response, NextFunction } from 'express'
import { Middleware } from '@domain/infra/gateways/Middleware'

const adapterMiddleware = (middleware :Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const httpResponse = await middleware.handle(request)

    if (httpResponse === false) {
      return response.status(200).send()
    }

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body)

      return next()
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body
      })
    }
  }
}

export default adapterMiddleware
