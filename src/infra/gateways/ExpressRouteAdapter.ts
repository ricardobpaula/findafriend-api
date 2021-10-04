import Controller from '@domain/infra/gateways/Controller'
import { Request, Response } from 'express'

const adaptExpressRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const dataRequest = {
      body: request.body,
      header: request.header,
      params: request.params,
      query: request.query,
      cookies: request.cookies,
      userId: Number(request.userId)
    }

    const dataResponse = await controller.handle(dataRequest)

    return response.status(dataResponse.statusCode).json(dataResponse.body)
  }
}

export default adaptExpressRoute
