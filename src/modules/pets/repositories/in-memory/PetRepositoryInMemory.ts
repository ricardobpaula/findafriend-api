import Pet from '../../entities/Pet/Pet'
import PetRepository, { FindPetParams } from '../PetRepository'

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

  async find (params: FindPetParams): Promise<Pet[]> {
    if (params.speciesIds) {
      return this.items.filter(pet => params.speciesIds.includes(pet.props.specieId) &&
        pet.props.adopted === false &&
        (params.size === undefined ? true : pet.props.size.value === params.size)
      ).splice(params.offset, params.limit)
    }

    return this.items.filter(pet => pet.props.adopted === false &&
      (params.size === undefined ? true : pet.props.size.value === params.size)
    ).splice(params.offset, params.limit)
  }
}
