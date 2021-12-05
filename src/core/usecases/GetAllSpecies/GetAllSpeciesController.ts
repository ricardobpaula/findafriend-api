import Controller from '@domain/infra/gateways/Controller'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import GetAllSpecies from './GetAllSpecies'

export default class GetAllSpeciesController implements Controller {
    private readonly getAllSpecies: GetAllSpecies
    constructor (getAllSpecies: GetAllSpecies) {
      this.getAllSpecies = getAllSpecies
    }

    async handle ():Promise<HttpResponse> {
      try {
        const species = await this.getAllSpecies.execute()
        return successHttp(200, species)
      } catch (error) {
        return errorHttp(500, error)
      }
    }
}
