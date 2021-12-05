import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import CreateSpecie, { SpecieRequest } from './CreateSpecie'

export default class CreateSpecieController implements Controller {
  private readonly createSpecie: CreateSpecie
  constructor (createSpecie: CreateSpecie) {
    this.createSpecie = createSpecie
  }

  async handle ({ body }: HttpRequest<SpecieRequest>):Promise<HttpResponse> {
    try {
      // TODO validar request

      const specieOrError = await this.createSpecie.execute(body)
      if (specieOrError.isLeft()) {
        return errorHttp(400, specieOrError.value)
      }
      return successHttp(201)
    } catch (error) {
      return errorHttp(500, error)
    }
  }
}
