import Controller from '@domain/infra/gateways/Controller'
import HttpRequest from '@domain/infra/gateways/HttpRequest'
import HttpResponse, { errorHttp, successHttp } from '@domain/infra/gateways/HttpResponse'
import CreatePet from './CreatePet'

type PetRequestBody = {
        description: string,
        specie: number,
        size: string
    }

export default class CreatePetController implements Controller {
    private readonly createPet: CreatePet
    constructor (createPet: CreatePet) {
      this.createPet = createPet
    }

    async handle ({ body, userId }: HttpRequest<PetRequestBody>): Promise<HttpResponse> {
      try {
        const petOrError = await this.createPet.execute({
          description: body.description,
          size: body.size,
          specieId: body.specie,
          ownerId: userId
        })
        if (petOrError.isLeft()) {
          return errorHttp(400, petOrError.value)
        }
        return successHttp(201)
      } catch (error) {
        return errorHttp(500, error)
      }
    }
}
