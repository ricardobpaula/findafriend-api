import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'

import UpdateUser, { UserRequest } from './UpdateUser'

export default class UpdateUserController implements Controller {
  private readonly updateUser: UpdateUser

  constructor (updateUser: UpdateUser) {
    this.updateUser = updateUser
  }

  async handle ({
    body: { firstName, lastName, email, phone },
    userId
  }: HttpRequest<UserRequest>):Promise<HttpResponse> {
    try {
      const data = await this.updateUser.execute({
        firstName,
        lastName,
        email,
        phone,
        userId
      })

      if (data.isLeft()) {
        return errorHttp(500, data.value)
      }
      return successHttp(200, data.value)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
