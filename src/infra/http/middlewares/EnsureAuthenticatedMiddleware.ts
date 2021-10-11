import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import { Middleware } from '@domain/infra/gateways/Middleware'
import AccessToken from '@domain/infra/gateways/AccessToken'
import AccessDeniedError from '../errors/AccessDeniedError'

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string
}

export default class EnsureAuthenticatedMiddleware implements Middleware {
  private accessToken: AccessToken
  constructor (accessToken: AccessToken) {
    this.accessToken = accessToken
  }

  async handle (
    request: EnsureAuthenticatedMiddlewareRequest
  ):Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        try {
          const decoded = await this.accessToken.verify(accessToken)

          return successHttp(200, { userId: decoded.sub })
        } catch (error) {
          return errorHttp(403, new AccessDeniedError())
        }
      }
      return errorHttp(403, new AccessDeniedError())
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request= {
    accessToken?: string
  }
}
