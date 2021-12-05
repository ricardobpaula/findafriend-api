import { FindPetsRequest } from '@core/usecases/FindPets/FindPets'
import Pet from '../../entities/Pet/Pet'
import PetRepository from '../PetRepository'

export default class PetRepositoryInMemory implements PetRepository {
  private items: Array<Pet>

  constructor () {
    this.items = []
  }

  async create (pet: Pet): Promise<void> {
    const petOrError = Pet.create(pet.props, this.items.length + 1)
    if (petOrError.isLeft()) {
      throw petOrError.value
    }
    this.items.push(petOrError.value)
  }

  async find (params: FindPetsRequest): Promise<Pet[]> {
    if (params.species) {
      return this.items.filter(pet => params.species.includes(pet.props.specie.id) &&
        (params.adopted === undefined ? true : pet.props.adopted === params.adopted) &&
        (params.size === undefined ? true : pet.props.size.value === params.size)
      ).splice(params.offset, params.limit)
    }

    return this.items.filter(pet => pet.props.adopted === false &&
      (params.size === undefined ? true : pet.props.size.value === params.size)
    ).splice(params.offset, params.limit)
  }

  async findById (id: number): Promise<Pet> {
    return this.items[id - 1]
  }
}
