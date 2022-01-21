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
      const offset = query.offset ? parseInt(query.offset) : 0
      const limit = query.limit ? parseInt(query.limit) : 5
      const adopted = query.adopted ? (query.adopted.toLowerCase() === 'true') : undefined
      const owner = query.owner ? query.owner : undefined
      const species = query?.species?.split(',')
      const pets = await this.findPets.execute({
        offset,
        limit,
        species,
        adopted,
        owner,
        size: query?.size
      })
      return successHttp(200, pets)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
