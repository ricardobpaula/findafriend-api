import Pet from '../../entities/Pet/Pet'
import PetRepository from '../../repositories/PetRepository'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'
import { Either, left, right } from '@domain/logic/Either'
import InvalidDescriptionError from '@modules/pets/entities/Pet/errors/InvalidDescriptionError'
import InvalidSizeError from '@modules/pets/entities/Pet/errors/InvalidSizeError'
import UserNotFoundError from './errors/UserNotFoundError'
import SpecieNotFoundError from './errors/SpecieNotFoundError'
import Description from '@modules/pets/entities/Pet/Description'
import Size from '@modules/pets/entities/Pet/Size'

type PetRequest = {
  description: string,
  ownerId: number,
  specieId: number,
  size: string
}

type PetResponse = Either<
  UserNotFoundError |
  SpecieNotFoundError |
  InvalidDescriptionError |
  InvalidSizeError,
  Pet>

export default class CreatePet {
    private readonly petRepository: PetRepository
    private readonly specieRepository: SpecieRepository

    constructor (
      petRepository: PetRepository,
      specieRepository: SpecieRepository) {
      this.petRepository = petRepository
      this.specieRepository = specieRepository
    }

    async execute (request: PetRequest): Promise<PetResponse> {
      const specie = await this.specieRepository.findByid(request.specieId)

      if (!specie) {
        return left(new SpecieNotFoundError())
      }

      const descriptionOrError = Description.create(request.description)

      if (descriptionOrError.isLeft()) {
        return left(descriptionOrError.value)
      }
      const sizeOrError = Size.create(request.size)

      if (sizeOrError.isLeft()) {
        return left(sizeOrError.value)
      }

      const petOrError = Pet.create({
        description: descriptionOrError.value,
        ownerId: request.ownerId,
        size: sizeOrError.value,
        specie,
        adopted: false
      })

      if (petOrError.isLeft()) {
        return left(petOrError.value)
      }

      const pet = await this.petRepository.createPet(petOrError.value)

      return right(pet)
    }
}
