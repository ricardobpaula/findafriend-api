import { FindPetsRequest } from '@modules/pets/usecases/FindPets/FindPets'
import Pet from '../../entities/Pet/Pet'
import PetRepository from '../PetRepository'

export default class PetRepositoryInMemory implements PetRepository {
  private items: Array<Pet>

  constructor () {
    this.items = []
  }

  async createPet (pet: Pet): Promise<Pet> {
    const petOrError = Pet.create(pet.props, this.items.length + 1)
    if (petOrError.isLeft()) {
      throw petOrError.value
    }
    this.items.push(petOrError.value)
    return petOrError.value
  }

  async find (params: FindPetsRequest): Promise<Pet[]> {
    if (params.species) {
      return this.items.filter(pet => params.species.includes(pet.props.specieId) &&
        pet.props.adopted === false &&
        (params.size === undefined ? true : pet.props.size.value === params.size)
      ).splice(params.offset, params.limit)
    }

    return this.items.filter(pet => pet.props.adopted === false &&
      (params.size === undefined ? true : pet.props.size.value === params.size)
    ).splice(params.offset, params.limit)
  }
}
