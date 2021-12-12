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

    async handle ({ userId, files, fields }: HttpRequest): Promise<HttpResponse> {
      try {
        const data = JSON.parse(fields.data) as PetRequestBody
        const petOrError = await this.createPet.execute({
          description: data.description,
          size: data.size,
          specieId: data.specie,
          ownerId: userId,
          files
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
