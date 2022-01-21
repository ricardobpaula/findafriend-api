import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import GetPet from './GetPet'

export default class GetPetController implements Controller {
  private readonly getPet: GetPet
  constructor (getPet: GetPet) {
    this.getPet = getPet
  }

  async handle ({ params }:HttpRequest):Promise<HttpResponse> {
    try {
      const pet = await this.getPet.execute({ id: params.id })
      return successHttp(200, pet)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
