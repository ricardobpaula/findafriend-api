import { Controller } from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import { errorHttp, sucessHttp, HttpResponse } from '@domain/infra/gateways/HttpResponse'
import CreateUser, { UserRequest } from './CreateUser'
import EmailAlreadyUsed from './errors/EmailAlreadyUsed'

export default class CreateUserController implements Controller {
  private readonly createUser: CreateUser
  constructor (createUser: CreateUser) {
    this.createUser = createUser
  }

  async handle ({ body }:HttpRequest<UserRequest>):Promise<HttpResponse> {
    try {
      // TODO validar request

      await this.createUser.execute(body)
      return sucessHttp(201)
    } catch (error) {
      switch (error.contructor) {
        case EmailAlreadyUsed:
          return errorHttp(400, error)

        default:
          return errorHttp(500, error)
      }
    }
  }
}
