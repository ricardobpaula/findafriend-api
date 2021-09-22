import Pet from '../../entities/Pet/Pet'
import PetRepository from '../../repositories/PetRepository'
import SpecieRepository from '@modules/pets/repositories/SpecieRepository'
import UserRepository from '@modules/accounts/repositories/UserRepository'
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
  specie: string,
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
    private readonly userRepository: UserRepository

    constructor (
      petRepository: PetRepository,
      specieRepository: SpecieRepository,
      userRepository: UserRepository) {
      this.petRepository = petRepository
      this.specieRepository = specieRepository
      this.userRepository = userRepository
    }

    async execute (request: PetRequest): Promise<PetResponse> {
      const owner = await this.userRepository.findById(request.ownerId)
      if (!owner) {
        return left(new UserNotFoundError())
      }

      const specie = await this.specieRepository.findByName(request.specie)

      if (!specie) {
        return left(new SpecieNotFoundError(request.specie))
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
        ownerId: owner.id,
        size: sizeOrError.value,
        specieId: specie.id
      })

      if (petOrError.isLeft()) {
        return left(petOrError.value)
      }

      const pet = await this.petRepository.createPet(petOrError.value)

      return right(pet)
    }
}
