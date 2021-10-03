import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import AuthUser, { AuthRequest } from './AuthUser'

export default class AuthUserController implements Controller {
  private readonly authUser: AuthUser
  constructor (authUser: AuthUser) {
    this.authUser = authUser
  }

  async handle ({ body }: HttpRequest<AuthRequest>):Promise<HttpResponse> {
    try {
      // TODO validar request

      const authOrError = await this.authUser.execute(body)
      if (authOrError.isLeft()) {
        return errorHttp(400, authOrError.value)
      }
      return successHttp(201, authOrError.value)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
