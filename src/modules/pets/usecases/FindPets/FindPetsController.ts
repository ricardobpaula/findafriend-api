import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import FindPets from './FindPets'

export default class FindPetsController implements Controller {
  private readonly findPets: FindPets
  constructor (findPets: FindPets) {
    this.findPets = findPets
  }

  async handle ({ query }: HttpRequest<any>):Promise<HttpResponse> {
    // TODO validar parametros

    try {
      const offset = query.offset ? query.offset : 1
      const limit = query.limit ? query.limit : 5
      const species = query?.species?.split(',').map((id:string) => (parseInt(id)))
      const pets = await this.findPets.execute({
        offset,
        limit,
        species,
        size: query?.size
      })
      return successHttp(200, pets)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
