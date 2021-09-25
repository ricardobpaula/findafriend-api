import { Either, left, right } from '@domain/logic/Either'
import Pet from '@modules/pets/entities/Pet/Pet'
import PetRepository from '@modules/pets/repositories/PetRepository'
import NoPetFoundError from './errors/NoPetFoundError'

export type FindPetsRequest = {
  offset?: number,
  limit?: number,
  specie?: string,
  size?: string
}

type FindPetsResponse = Either<NoPetFoundError, Pet[]>

export default class FindPets {
  private readonly petRepository: PetRepository

  constructor (petRepository: PetRepository) {
    this.petRepository = petRepository
  }

  async execute (params?: FindPetsRequest): Promise<FindPetsResponse> {
    const pets = await this.petRepository.find(params)

    if (pets.length === 0) {
      return left(new NoPetFoundError())
    }

    return right(pets)
  }
}
