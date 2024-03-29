import Specie from '../../entities/Specie/Specie'
import SpecieRepository from '../../repositories/SpecieRepository'
import SpecieAlreadyExists from './errors/SpecieAlreadyExists'
import { Either, left, right } from '@domain/logic/Either'
import InvalidNameError from '@core/entities/Specie/errors/InvalidNameError'
import Name from '@core/entities/Specie/Name'

export type SpecieRequest = {
  name: string
}

type SpecieResponse = Either<
  InvalidNameError |
  SpecieAlreadyExists,
  Specie>

export default class CreateSpecie {
    private readonly specieRepository: SpecieRepository
    constructor (specieRepository: SpecieRepository) {
      this.specieRepository = specieRepository
    }

    async execute (request:SpecieRequest):Promise<SpecieResponse> {
      const specieAlreadyExists = await this.specieRepository.findByName(request.name)

      if (specieAlreadyExists) {
        return left(new SpecieAlreadyExists(request.name))
      }

      const nameOrError = Name.create(request.name)

      if (nameOrError.isLeft()) {
        return left(nameOrError.value)
      }

      const specieOrError = Specie.create({ name: nameOrError.value })

      if (specieOrError.isLeft()) {
        return left(specieOrError.value)
      }

      const specie = await this.specieRepository.create(specieOrError.value)

      return right(specie)
    }
}
