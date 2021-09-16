import { Controller } from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import { errorHttp, sucessHttp, HttpResponse } from '@domain/infra/gateways/HttpResponse'
import CreateUser, { UserRequest } from './CreateUser'

export default class CreateUserController implements Controller {
  private readonly createUser: CreateUser
  constructor (createUser: CreateUser) {
    this.createUser = createUser
  }

  async handle ({ body }:HttpRequest<UserRequest>):Promise<HttpResponse> {
    try {
      // TODO validar request

      const userOrError = await this.createUser.execute(body)
      if (userOrError.isLeft()) {
        return errorHttp(400, userOrError.value)
      }
      return sucessHttp(201)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
