import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import RefreshToken from './RefreshToken'

export default class RefreshTokenController implements Controller {
  private readonly refreshToken: RefreshToken
  constructor (refreshToken: RefreshToken) {
    this.refreshToken = refreshToken
  }

  async handle ({ body }:HttpRequest):Promise<HttpResponse> {
    try {
      const response = await this.refreshToken.execute({ token: body.refreshToken })
      if (response.isRight()) {
        return successHttp(200, response.value)
      } else {
        return errorHttp(500, response.value)
      }
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
